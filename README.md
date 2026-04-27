#  Interactive 3D Kitchen

An interactive 3D kitchen built with **Three.js**, featuring clickable objects, animated doors, lighting, fire effects, and smoke simulation. 
https://essabki.github.io/3D_Kitchen/

<img width="1398" height="875" alt="2" src="https://github.com/user-attachments/assets/e7dc9afe-d3d9-404c-be44-835c487d37ef" />



https://github.com/user-attachments/assets/6fa7b548-64f2-4c60-bbe7-952f64daed2d


### 🕹️ Controls
- Mouse camera movement (Orbit / FPS style depending on setup)
- Click interactions on objects
- Smooth animations for doors, lids, and appliances


## 🏠 Kitchen Components

### 🚪 Water Sink Desk
- Modern sink desk model
- 2 animated doors (open/close with click)
- “Class-based” structure for easy expansion
- Water sink element integrated into the desk



### 💰 Treasury Cabinet
- Large storage unit
- 4 interactive doors
- Click to open/close each door individually
- Organized grouped structure for performance



### ❄️ Refrigerator System
- Main fridge with separate freezer section
- 2 clickable “lumps” (interactive handles/buttons)
- Internal shelf structure
- Smooth open/close animation



### 🔥 Cooking Table
- Gas cooktop integrated into table
- Oven placed underneath
- Realistic kitchen layout design



### 🔥 Gas Cooktop
- Active fire simulation
- Toggle fire on/off
- Visual flame effect for cooking experience



### 🍞 Oven System
- Clickable oven door (lump interaction)
- Internal smoke effect when active
- Realistic heating / cooking simulation feel



## 💨 Effects
- Fire particles for gas cooktop
- Smoke system for oven
- Smooth transitions and animations



## 🧠 Tech Stack
- Three.js (3D rendering)
- JavaScript (logic & interactions)
- HTML5 / CSS (structure & styling)
- Raycasting (click detection)



## 📦 Project Structure
```
/project
├── index.html
├── script.js
└── /models
└── img.glb
```
git clone
```bash
https://github.com/Essabki/3D_Kitchen-.git
```

- Everything else is handled inside `script.js`
## ⚙️ How It Works
- All logic is inside **script.js**
- Uses **Three.js GLTFLoader** to load `.glb` model
- Raycasting handles click detection
- Doors and objects use rotation animations
- Effects (fire/smoke) are triggered by interaction states

---

## 🚀 How to Run
1. Open `index.html`
2. Make sure you use a local server (important for GLB loading):
 - VS Code Live Server OR
 - Python server:
   ```
   python -m http.server
   ```
## ⚠️ Important Notes
- `.glb` files will NOT load properly without a server (CORS issue)
- Keep `img.glb` path correct in `script.js`
- Everything is controlled from a single script file



## 👨‍💻 by Essabki
Built for learning interactive 3D web development with Three.js.
