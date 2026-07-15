# Clara Studio Rig — Rive build specification

Source artwork: `clara-studio-source.svg`

## Artboard

- Name: `ClaraStudio`
- Size: 700 × 900
- Fit: contain
- Runtime state machine: `State Machine 1` (Rive editor default name; the bridge binds to this exact name)

## Bones and hierarchy

- `rig_root`
  - `body`
  - `arm_left` → `upper_arm_left` → `forearm_left` → `hand_left`
  - `arm_right` → `upper_arm_right` → `forearm_right` → `hand_right`
  - `head`
    - `eyes` → `eye_left`, `eye_right`
    - `brows` → `brow_left`, `brow_right`
    - `mouth_anchor`

## View-model properties

- `speaking` — boolean
- `listening` — boolean
- `thinking` — boolean
- `emotion` — enum: `neutral`, `encourage`, `success`, `celebrate`
- `viseme` — enum: `REST`, `A`, `E`, `I`, `O`, `U`, `M`, `F`
- `lookX` — number, -1…1
- `lookY` — number, -1…1
- `motionLevel` — number, 0…2
- `thumbsUp` — trigger
- `wave` — trigger

## Animation states

- `Idle`: breathing, tiny head drift, randomized blink
- `Listen`: eye contact, slight head tilt, hands relaxed
- `Think`: gaze upper-right, chin-hand pose
- `Talk`: phoneme mouth blend, small head and shoulder beats
- `Explain`: open-palm left-hand gesture
- `Encourage`: soft smile and short nod
- `Success`: smile, two natural nods, `gesture_thumbs_up`
- `Celebrate`: raised hands, brighter eyes, short body lift

## Lip-sync blending

Transitions between adjacent visemes should take 55–85 ms. REST is inserted at punctuation and word gaps. The application already produces the exact eight viseme names used here.

## Export

Export as `clara-studio.riv` beside this file. Keep all shapes embedded so the rig works offline. After export, the application runtime can bind the existing behavior and lip-sync values to `TeacherState`.
