---
name: feedback-css-object-position
description: "object-position Y axis direction — increasing Y moves face UP in ring, decreasing moves face DOWN"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fe95d198-9777-41d6-8315-4934f1adb929
---

For a portrait image in a square container with object-fit: cover, the Y axis of object-position works like this:

- **Increasing Y%** → shows lower portion of image → face moves UP in the ring
- **Decreasing Y%** → shows upper portion of image → face moves DOWN in the ring

**Why:** Y=0% anchors the top of the image to the top of the container (shows trees/background at top of photo). Y=100% anchors the bottom. For a portrait headshot where the face is in the lower-middle of the frame, you need a higher Y value (40–50%+) to center the face.

**How to apply:** When user says "move face up", increase Y. When they say "move face down", decrease Y. Never go the other way.

Final working value for avatar.jpg: `[object-position:50%_48%] scale-[1.1] translate-x-2`
- scale-[1.1] creates horizontal overflow to enable translate-x
- translate-x-2 (8px right) corrects horizontal face position
