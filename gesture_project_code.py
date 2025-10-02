!pip install mediapipe
import cv2
import mediapipe as mp
import numpy as np

# Initialize mediapipe hand model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)  # Only detect one hand
mp_draw = mp.solutions.drawing_utils

# Define gesture recognition function
def recognize_gesture(landmarks):
    fingers = []

    # Thumb
    if landmarks[4].x < landmarks[3].x:
        fingers.append(1)
    else:
        fingers.append(0)

    # Fingers (Index, Middle, Ring, Pinky)
    for tip in [8, 12, 16, 20]:
        if landmarks[tip].y < landmarks[tip - 2].y:
            fingers.append(1)
        else:
            fingers.append(0)

    total_fingers = sum(fingers)

    if total_fingers == 0:
        return "Fist"
    elif total_fingers == 5:
        return "Open Palm"
    elif fingers == [1, 0, 0, 0, 0]:
        return "Thumbs Up"
    elif fingers == [0, 1, 1, 0, 0]:
        return "Peace Sign"
    else:
        return f"{total_fingers} Fingers"

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    success, img = cap.read()
    if not success:
        break

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    gesture = "No Hand Detected"

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Recognize gesture
            gesture = recognize_gesture(hand_landmarks.landmark)

    # Show gesture
    cv2.putText(img, f'Gesture: {gesture}', (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Image", img)

    # Wait for key press, break loop on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
