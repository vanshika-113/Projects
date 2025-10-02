CREATE TABLE TRAIN (
    TID INT PRIMARY KEY,
    TNAME VARCHAR(50),
    TTYPE VARCHAR(30)
);
CREATE TABLE PASSENGERS (
    PID INT PRIMARY KEY,
    P_NAME VARCHAR(50),
    AGE INT,
    GENDER VARCHAR(10),
    COACH INT,
    COACH_TYPE VARCHAR(20),
    SEAT_NO VARCHAR(10),
    TRAIN_ID INT,
    FOREIGN KEY (TRAIN_ID) REFERENCES TRAIN(TID)
);
CREATE TABLE TRACKS (
    TRACK_NO INT PRIMARY KEY,
    LENGTH VARCHAR(20) -- Consider using a numeric type like DECIMAL or INT for length
);
ALTER TABLE TRACKS
MODIFY LENGTH NUMERIC(7,2);

CREATE TABLE MOVES_ON (
    TRAIN_ID INT,
    TRACK_NO INT,
    PRIMARY KEY (TRAIN_ID, TRACK_NO),
    FOREIGN KEY (TRAIN_ID) REFERENCES TRAIN(TID),
    FOREIGN KEY (TRACK_NO) REFERENCES TRACKS(TRACK_NO)
);



CREATE TABLE STATION (
    S_ID INT PRIMARY KEY,
    S_NAME VARCHAR(50),
    PLACE VARCHAR(50),
    TRACK_NO INT,
    FOREIGN KEY (TRACK_NO) REFERENCES TRACKS(TRACK_NO)
);

CREATE TABLE ROUTE (
    ROUTE_NO INT PRIMARY KEY,
    TOTAL_STOPS INT
);

CREATE TABLE SCHEDULES (
    SCHEDULE_ID INT PRIMARY KEY,
    SOURCE VARCHAR(50),
    DESTINATION VARCHAR(50),
    START_TIME TIMESTAMP,
    END_TIME TIMESTAMP,
    TRAIN_ID INT UNIQUE,
    ROUTE_NO INT,
    FOREIGN KEY (TRAIN_ID) REFERENCES TRAIN(TID),
    FOREIGN KEY (ROUTE_NO) REFERENCES ROUTE(ROUTE_NO)
);

CREATE TABLE CONSISTS_OF (
    ROUTE_NO INT,
    TRAIN_ID INT,
    SCHEDULE_ID INT,
    STATION_ID INT,
    STOP_NO INT,
    ARRIVAL_TIME TIMESTAMP,
    DEPARTURE_TIME TIMESTAMP,
    PRIMARY KEY (ROUTE_NO, TRAIN_ID, SCHEDULE_ID, STATION_ID),
    FOREIGN KEY (ROUTE_NO) REFERENCES ROUTE(ROUTE_NO),
    FOREIGN KEY (TRAIN_ID) REFERENCES TRAIN(TID),
    FOREIGN KEY (SCHEDULE_ID) REFERENCES SCHEDULES(SCHEDULE_ID),
    FOREIGN KEY (STATION_ID) REFERENCES STATION(S_ID)
);

INSERT INTO TRAIN (TID, TNAME, TTYPE) VALUES 
(111, 'Tejas Express', 'Superfast'),
(112, 'Vande Bharat', 'Superfast'),
(113, 'Humsafar Express', 'Express'),
(114, 'Jan Shatabdi', 'Passenger'),
(115, 'Antyodaya Express', 'Economy');

INSERT INTO TRACKS (TRACK_NO, LENGTH) VALUES
(211, 275.60),
(212, 420.80),
(213, 310.20),
(214, 495.10),
(215, 165.00);

INSERT INTO STATION (S_ID, S_NAME, PLACE, TRACK_NO) VALUES
(11, 'Mumbai Central', 'Mumbai', 211),
(12, 'Pune Junction', 'Pune', 211),
(13, 'Nagpur', 'Nagpur', 212),
(14, 'Bhopal', 'Bhopal', 212),
(15, 'Indore Junction', 'Indore', 213),
(16, 'Raipur', 'Raipur', 214);

INSERT INTO MOVES_ON (TRAIN_ID, TRACK_NO) VALUES
(111, 211),
(112, 212),
(113, 213),
(114, 214),
(115, 215);

INSERT INTO ROUTE (ROUTE_NO, TOTAL_STOPS) VALUES
(311, 6),
(312, 5),
(313, 4),
(314, 3),
(315, 7);

INSERT INTO SCHEDULES (SCHEDULE_ID, SOURCE, DESTINATION, START_TIME, END_TIME, TRAIN_ID, ROUTE_NO) VALUES
(411, 'Mumbai Central', 'Pune Junction', TIMESTAMP '2025-05-01 05:30:00', TIMESTAMP '2025-05-01 09:00:00', 111, 311),
(412, 'Mumbai Central', 'Nagpur', TIMESTAMP '2025-05-01 06:15:00', TIMESTAMP '2025-05-01 12:45:00', 112, 312),
(413, 'Nagpur', 'Bhopal', TIMESTAMP '2025-05-01 07:40:00', TIMESTAMP '2025-05-01 11:50:00', 113, 313),
(414, 'Indore Junction', 'Raipur', TIMESTAMP '2025-05-01 06:10:00', TIMESTAMP '2025-05-01 13:00:00', 114, 314),
(415, 'Bhopal', 'Raipur', TIMESTAMP '2025-05-01 07:20:00', TIMESTAMP '2025-05-01 15:15:00', 115, 315);

INSERT INTO CONSISTS_OF (ROUTE_NO, TRAIN_ID, SCHEDULE_ID, STATION_ID, STOP_NO, ARRIVAL_TIME, DEPARTURE_TIME) VALUES
(311, 111, 411, 11, 1, TIMESTAMP '2025-05-01 05:30:00', TIMESTAMP '2025-05-01 05:40:00'),
(311, 111, 411, 12, 2, TIMESTAMP '2025-05-01 08:30:00', TIMESTAMP '2025-05-01 08:45:00'),
(312, 112, 412, 11, 1, TIMESTAMP '2025-05-01 06:15:00', TIMESTAMP '2025-05-01 06:30:00'),
(312, 112, 412, 13, 2, TIMESTAMP '2025-05-01 12:00:00', TIMESTAMP '2025-05-01 12:20:00'),
(313, 113, 413, 13, 1, TIMESTAMP '2025-05-01 07:40:00', TIMESTAMP '2025-05-01 07:55:00'),
(313, 113, 413, 14, 2, TIMESTAMP '2025-05-01 11:10:00', TIMESTAMP '2025-05-01 11:25:00');

INSERT INTO PASSENGERS (PID, P_NAME, AGE, GENDER, COACH, COACH_TYPE, SEAT_NO, TRAIN_ID) VALUES
(21, 'Manish Kumar', 29, 'Male', 1, 'Sleeper', 'S1-25', 111),
(22, 'Sneha Reddy', 26, 'Female', 2, 'AC 2 Tier', 'A2-18', 111),
(23, 'Vikas Gupta', 34, 'Male', 3, 'AC 3 Tier', 'B3-10', 112),
(24, 'Meera Joshi', 24, 'Female', 1, 'Sleeper', 'S2-05', 113),
(25, 'Rajat Verma', 37, 'Male', 2, 'AC Chair Car', 'C1-20', 114),
(26, 'Divya Singh', 28, 'Female', 1, 'Sleeper', 'S4-33', 115),
(27, 'Aman Thakur', 32, 'Male', 2, 'AC 2 Tier', 'A1-08', 115);


SELECT * FROM TRAIN;
SELECT * FROM PASSENGERS;
SELECT * FROM TRACKS;
SELECT * FROM MOVES_ON;
SELECT * FROM STATION;
SELECT * FROM ROUTE;
SELECT * FROM SCHEDULES;
SELECT * FROM CONSISTS_OF;

--TRIGGER to prevent duplicate seats
CREATE OR REPLACE TRIGGER trg_prevent_duplicate_seat
BEFORE INSERT ON PASSENGERS
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM PASSENGERS
    WHERE TRAIN_ID = :NEW.TRAIN_ID
      AND SEAT_NO = :NEW.SEAT_NO;
    
    IF v_count > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Seat already booked for this train!');
    END IF;
END;

-- Attempt to insert two passengers with the same seat and same train
INSERT INTO PASSENGERS (PID, P_NAME, AGE, GENDER, COACH, COACH_TYPE, SEAT_NO, TRAIN_ID)
VALUES (28, 'Akash Kumar', 29, 'Male', 1, 'Sleeper', 'S1-45', 112);
-- If seat S1-45 already exists for train 101, it will give error

--PROCEDURE to book a ticket
CREATE OR REPLACE PROCEDURE book_ticket (
    p_pid INT,
    p_name VARCHAR2,
    p_age INT,
    p_gender VARCHAR2,
    p_coach INT,
    p_coach_type VARCHAR2,
    p_seat_no VARCHAR2,
    p_train_id INT
) IS
BEGIN
    INSERT INTO PASSENGERS (PID, P_NAME, AGE, GENDER, COACH, COACH_TYPE, SEAT_NO, TRAIN_ID)
    VALUES (p_pid, p_name, p_age, p_gender, p_coach, p_coach_type, p_seat_no, p_train_id);
    
    DBMS_OUTPUT.PUT_LINE('Ticket booked successfully for ' || p_name);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error booking ticket: ' || SQLERRM);
END;

-- Booking a new ticket
BEGIN
  book_ticket(21,'Sneha Sharma',25,'Female',1,'Sleeper','S3-22',111);
END;

--PROCEDURE for canceling ticket
CREATE OR REPLACE PROCEDURE cancel_ticket (
    p_pid INT
) IS
BEGIN
    DELETE FROM PASSENGERS WHERE PID = p_pid;
    
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No such Passenger ID exists.');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Ticket cancelled successfully.');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error cancelling ticket: ' || SQLERRM);
END;

-- Cancelling a ticket
BEGIN
  cancel_ticket(200); --(Passenger ID you want to cancel)
END;

--Get train arrival time at a station
CREATE OR REPLACE FUNCTION get_arrival_time(p_train_id INT, p_station_id INT)
RETURN TIMESTAMP IS
    v_arrival_time TIMESTAMP;

BEGIN
    SELECT ARRIVAL_TIME INTO v_arrival_time
    FROM CONSISTS_OF
    WHERE TRAIN_ID = p_train_id AND STATION_ID = p_station_id;
    
    RETURN v_arrival_time;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
END;

-- Getting arrival time for Train 101 at Station 2
SELECT get_arrival_time(111, 11) AS Arrival_Time FROM dual;

--Get train departure time at a station
CREATE OR REPLACE FUNCTION get_departure_time(
    p_train_id INT,
    p_station_id INT
)
RETURN TIMESTAMP IS
    v_departure_time TIMESTAMP;
BEGIN
    SELECT DEPARTURE_TIME
    INTO v_departure_time
    FROM CONSISTS_OF
    WHERE TRAIN_ID = p_train_id
      AND STATION_ID = p_station_id;
    
    RETURN v_departure_time;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL; 
END;

-- Get departure time for Train 101 at Station 2
SELECT get_departure_time(111, 11) AS Departure_Time FROM dual;

--Calculate total stops for a route
CREATE OR REPLACE FUNCTION get_total_stops(p_route_no INT)
RETURN INT IS
    v_stops INT;
BEGIN
    SELECT TOTAL_STOPS INTO v_stops
    FROM ROUTE
    WHERE ROUTE_NO = p_route_no;
    
    RETURN v_stops;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;

-- Get total stops for Route No 301
SELECT get_total_stops(311) AS Total_Stops
FROM dual;

--List all the stations where a specific train stops (say 101)
SELECT ST.S_NAME, C.ARRIVAL_TIME, C.DEPARTURE_TIME
FROM CONSISTS_OF C
JOIN STATION ST ON C.STATION_ID = ST.S_ID
WHERE C.TRAIN_ID = 111
ORDER BY C.STOP_NO;

SELECT P.P_NAME, P.SEAT_NO, T.TNAME
FROM PASSENGERS P
JOIN TRAIN T ON P.TRAIN_ID = T.TID
WHERE P.COACH_TYPE = 'AC 2 Tier';

--Show trains that stop at more than 2 stations
SELECT TNAME
FROM TRAIN
WHERE TID IN (
    SELECT TRAIN_ID
    FROM CONSISTS_OF
    GROUP BY TRAIN_ID
    HAVING COUNT(*) > 2
);

SELECT DISTINCT T.TID, T.TNAME, TR.LENGTH 
FROM TRAIN T
JOIN MOVES_ON M  ON T.TID=M.TRAIN_ID
JOIN TRACKS TR ON M.TRACK_NO=TR.TRACK_NO
WHERE TR.LENGTH>300;