import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x001122);

// Camera
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(15, 10, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;  
renderer.toneMappingExposure = 1.2;                  
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.zoomToCursor = true;
controls.enablePan = true;
controls.screenSpacePanning = true;
controls.minDistance = 2;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set(0, 3, 0);
controls.update();

// 💡 LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 3));
const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
mainLight.position.set(3, 10, 5);
scene.add(mainLight);

// =========================
// 🟤 FLOOR + BACK WALL
// =========================
const floorGeometry = new THREE.PlaneGeometry(15,10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3.2;
floor.position.z = 2.9;
scene.add(floor);
// back
const backWallGeometry = new THREE.PlaneGeometry(15, 8);
const backWallMaterial = new THREE.MeshStandardMaterial({ color: 0x7a4a1e });
const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
backWall.position.set(0, 0.8, -2.1);
scene.add(backWall);
// left
const leftWallGeometry = new THREE.PlaneGeometry(10, 8);
const leftWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x7a4a1e,
    //transparent: true,   // 👈 important
    opacity: 0.4,        // 👈 transparency level (0 = invisible, 1 = solid)
    roughness: 0.1,
    metalness: 0.2,
    side: THREE.DoubleSide // 👈 visible from both sides
});

const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);

// position
leftWall.position.set(-7.50, 0.8, 2.90);

// rotation (example: turn it like a real wall)
leftWall.rotation.y = Math.PI / 2; // 90 degrees

scene.add(leftWall);
// =========================
// 🟤 DESK (COMPLETE)
// =========================
const desk = new THREE.Group();

// 1. DESK RIGHT SIDE + DOOR + HANDLE
const geometry_right_side = new THREE.BoxGeometry(3,2,2);
const materials_right_side = [
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, transparent:true, opacity:0}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
];
const desk_right_side = new THREE.Mesh(geometry_right_side, materials_right_side);

// RIGHT DOOR PIVOT
const doorPivotright = new THREE.Object3D();
doorPivotright.position.set(0, -1, 1);
const kitchen_desk_right_side_Door = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.1),
    new THREE.MeshStandardMaterial({color:0xaaaaaa, transparent:true, opacity:0.4})
);
kitchen_desk_right_side_Door.position.set(0, 1, 0);
doorPivotright.add(kitchen_desk_right_side_Door);

const handleright = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.9, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
handleright.position.set(0, 0.8,0.08);
handleright.rotation.z = Math.PI / 2;
kitchen_desk_right_side_Door.add(handleright);
desk_right_side.add(doorPivotright);
desk_right_side.position.set(-2.7,-1.5,0);
desk_right_side.rotation.z = Math.PI/-2;
desk.add(desk_right_side);

// 2. DESK LEFT SIDE + DOOR + HANDLE
const geometry_left_side = new THREE.BoxGeometry(3,2,2);
const materials_left_side = [
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color:0x777777, transparent:true, opacity:0}),
    new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
];
const desk_left_side = new THREE.Mesh(geometry_left_side, materials_left_side);

const doorPivotleft = new THREE.Object3D();
doorPivotleft.position.set(0, -1, 1);
const kitchen_desk_left_side_Door = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.1),
    new THREE.MeshStandardMaterial({color:0xaaaaaa, transparent:true, opacity:0.4})
);
kitchen_desk_left_side_Door.position.set(0, 1, 0);
doorPivotleft.add(kitchen_desk_left_side_Door);

const handleleft = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.9, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
handleleft.position.set(0, 0.8,0.08);
handleleft.rotation.z = Math.PI / 2;
kitchen_desk_left_side_Door.add(handleleft);
desk_left_side.add(doorPivotleft);
desk_left_side.position.set(2.7,-1.5,0);
desk_left_side.rotation.z = Math.PI/2;
desk.add(desk_left_side);

// 3. WATER TAP + FLOOR PIECES
const Water_tap_geometry = new THREE.BoxGeometry(2.5,1.5,1.2);
const Water_tap_materials = [
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x777777}),
    new THREE.MeshStandardMaterial({color:0x000000, transparent:true, opacity:0.4}),
    new THREE.MeshStandardMaterial({color:0x777777})
];
const Water_tap = new THREE.Mesh(Water_tap_geometry, Water_tap_materials);
Water_tap.position.set(0,-0.6,0);
Water_tap.rotation.x = Math.PI / -2;
desk.add(Water_tap);

// Water tap floor pieces
const Water_tap_floor_left_geometry = new THREE.BoxGeometry(2.50,0.02,2);
const Water_tap_floor_left_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_left = new THREE.Mesh(Water_tap_floor_left_geometry, Water_tap_floor_left_material);
Water_tap_floor_left.position.set(2.45,0,0);
desk.add(Water_tap_floor_left);

const Water_tap_floor_right_geometry = new THREE.BoxGeometry(2.50,0.02,2);
const Water_tap_floor_right_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_right = new THREE.Mesh(Water_tap_floor_right_geometry, Water_tap_floor_right_material);
Water_tap_floor_right.position.set(-2.45,0,0);
desk.add(Water_tap_floor_right);

const Water_tap_floor_front_geometry = new THREE.BoxGeometry(2.4,0.02,0.40);
const Water_tap_floor_front_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_front = new THREE.Mesh(Water_tap_floor_front_geometry, Water_tap_floor_front_material);
Water_tap_floor_front.position.set(0,0,0.8);
desk.add(Water_tap_floor_front);

const Water_tap_floor_back_geometry = new THREE.BoxGeometry(2.4,0.02,0.40);
const Water_tap_floor_back_material = new THREE.MeshStandardMaterial({color:0x777777});
const Water_tap_floor_back = new THREE.Mesh(Water_tap_floor_back_geometry, Water_tap_floor_back_material);
Water_tap_floor_back.position.set(0,0,-0.8);
desk.add(Water_tap_floor_back);

// 🦶 DESK FEET
const deskGroup = new THREE.Group();
const deskfootGeometry = new THREE.CylinderGeometry(0.10, 0.13, 0.23, 8);
const deskfootMaterial = new THREE.MeshStandardMaterial({color: 0x444444});

const deskfoot1 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot1.position.set(-3.55, -3.12, -0.8);
deskfoot1.rotation.x = Math.PI;
deskGroup.add(deskfoot1);

const deskfoot2 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot2.position.set(3.5, -3.12, -0.85);
deskfoot2.rotation.x = Math.PI;
deskGroup.add(deskfoot2);

const deskfoot3 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot3.position.set(-3.55, -3.12, 0.85);
deskfoot3.rotation.x = Math.PI;
deskGroup.add(deskfoot3);

const deskfoot4 = new THREE.Mesh(deskfootGeometry, deskfootMaterial);
deskfoot4.position.set(3.5, -3.12, 0.85);
deskfoot4.rotation.x = Math.PI;
deskGroup.add(deskfoot4);

desk.add(deskGroup);
scene.add(desk);
desk.position.set(-1, 0, -1);

// =========================
// 📋 TABLE
// =========================
const tableGeometry = new THREE.BoxGeometry(7.4,0.1,2);
const tableMaterial = new THREE.MeshStandardMaterial({color:0x777777});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.rotation.y = Math.PI/2;
scene.add(table);
table.position.set(-5.70,-0.04,1.7);

const tableLeg1Geometry = new THREE.BoxGeometry(2,3.1,0.1);
const tableLeg1Material = new THREE.MeshStandardMaterial({color:0x777777});
const tableLeg1 = new THREE.Mesh(tableLeg1Geometry, tableLeg1Material);
tableLeg1.position.set(-5.70,-1.6,5.35);
scene.add(tableLeg1);

// 🔥 TREASURY SYSTEM - FULLY INTEGRATED!
const allTreasuries = [];

function createTreasury(x, z, treasuriesArray = allTreasuries) {
    const group = new THREE.Group();

    // BODY
    const geometry = new THREE.BoxGeometry(3,2,2);
    const materials = [
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide}),
        new THREE.MeshStandardMaterial({color:0x000000, transparent:true, opacity:0}),
        new THREE.MeshStandardMaterial({color:0x777777, side:THREE.DoubleSide})
    ];
    const body = new THREE.Mesh(geometry, materials);
    group.add(body);

    // PIVOT
    const pivot = new THREE.Object3D();
    pivot.position.set(0, -1, 1);

    // DOOR
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(3,2,0.1),
        new THREE.MeshStandardMaterial({
            color:0xaaaaaa,
            transparent:true,
            opacity:0.4
        })
    );
    door.position.set(0,1,0);

    // HANDLE
    const handle = new THREE.Mesh(
        new THREE.BoxGeometry(1,0.1,0.1),
        new THREE.MeshStandardMaterial({color:0x777777})
    );
    handle.position.set(0,0.8,0.09);
    door.add(handle);

    pivot.add(door);
    group.add(pivot);

    // POSITION
    group.position.set(x,0,z);
    group.scale.set(0.5,0.5,0.5);
    group.rotation.z = Math.PI / -2;

    // SAVE STATE
    treasuriesArray.push({
        door,
        pivot,
        open:false
    });

    return group;
}

// CREATE TREASURY GROUPS
const treasuryGroupleft = new THREE.Group();
treasuryGroupleft.position.set(1.01, 0, 0);

const treasuryGroupright = new THREE.Group();
treasuryGroupright.position.set(-1.01, 0, 0);

const treasuryfullGroup = new THREE.Group();
treasuryfullGroup.scale.set(1,0.5,0.5);
scene.add(treasuryfullGroup);

// Add treasuries to LEFT group
const treasury1_left = createTreasury(-0.5, 0);
treasury1_left.rotation.z = Math.PI / -2;
treasuryGroupleft.add(treasury1_left);

const treasury2_left = createTreasury(0.5, 0);
treasury2_left.rotation.z = Math.PI / 2;
treasuryGroupleft.add(treasury2_left);

// Add treasuries to RIGHT group
const treasury1_right = createTreasury(-0.5, 0);
treasury1_right.rotation.z = Math.PI / -2;
treasuryGroupright.add(treasury1_right);

const treasury2_right = createTreasury(0.5, 0);
treasury2_right.rotation.z = Math.PI / 2;
treasuryGroupright.add(treasury2_right);

// Add both groups to full group
treasuryfullGroup.add(treasuryGroupleft);
treasuryfullGroup.add(treasuryGroupright);

// POSITION TREASURY IN KITCHEN
treasuryfullGroup.position.set(-1, 2.1, -1.5);
//scale TREASURY IN KITCHEN
treasuryfullGroup.scale.set(1.5,1,1);
// =========================
// 🧊 REFRIGERATOR (COMPLETE)
// =========================
const fridge = new THREE.Group();
scene.add(fridge);

// 🔆 FREEZER LIGHT
const freezerLamp1 = new THREE.PointLight(0xffaa33, 0, 3);
freezerLamp1.decay = 2;
freezerLamp1.distance = 5;
freezerLamp1.position.set(1.9, 1.8, 0);
fridge.add(freezerLamp1);

const freezerBulb1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,                
        emissive: 0xffffff,
        emissiveIntensity: 0
    })
);
freezerBulb1.position.set(1.9, 1.8, 0.07);
fridge.add(freezerBulb1);

const freezerLampCoverGeo1 = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 32, 1, true);
const freezerLampCoverMat1 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});
const freezerLampCover1 = new THREE.Mesh(freezerLampCoverGeo1, freezerLampCoverMat1);
freezerLampCover1.rotation.z = Math.PI / 2;
freezerLampCover1.position.set(1.9, 1.8, 0.1);
fridge.add(freezerLampCover1);

// 🔆 MAIN FRIDGE LIGHT
const fridgeLamp2 = new THREE.PointLight(0xffaa33, 0, 3);
fridgeLamp2.decay = 2;
fridgeLamp2.distance = 5;
fridgeLamp2.position.set(1.8, -1.5, 0);
fridge.add(fridgeLamp2);

const fridgeBulb2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
        emissive: 0xffffff,
        emissiveIntensity: 0
    })
);
fridgeBulb2.position.set(1.8, -1.5, 0.07);
fridge.add(fridgeBulb2);

const fridgeLampCoverGeo2 = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 32, 1, true);
const fridgeLampCoverMat2 = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});
const fridgeLampCover2 = new THREE.Mesh(fridgeLampCoverGeo2, fridgeLampCoverMat2);
fridgeLampCover2.rotation.z = Math.PI / 2;
fridgeLampCover2.position.set(1.8, -1.5, 0.1);
fridge.add(fridgeLampCover2);

// FREEZER + MAIN BODY
const freezerMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0 }),
    new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide })
];
const cube_freezer = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 2), freezerMaterials);
fridge.add(cube_freezer);
cube_freezer.position.set(0, 2, 0);

const cube_mainFridge = new THREE.Mesh(new THREE.BoxGeometry(4, 6, 2), freezerMaterials);
fridge.add(cube_mainFridge);
cube_mainFridge.position.set(0, -2, 0);

// PULL-OUT SHELF 
const pullOutShelf = new THREE.Group();
const shelfMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const shelfBottom = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 1.5), shelfMat);
shelfBottom.position.set(0, -1.4, 0);
pullOutShelf.add(shelfBottom);

const shelfSide1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 1.5), shelfMat);
shelfSide1.position.set(1.75, -0.9, 0);
pullOutShelf.add(shelfSide1);

const shelfSide2 = shelfSide1.clone();
shelfSide2.position.set(-1.75, -0.9, 0);
pullOutShelf.add(shelfSide2);

const shelfFront = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1, 0.1), shelfMat);
shelfFront.position.set(0, -0.9, 0.75);
pullOutShelf.add(shelfFront);

const shelfBack = shelfFront.clone();
shelfBack.position.set(0, -0.9, -0.75);
pullOutShelf.add(shelfBack);

const shelfHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
);
shelfHandle.rotation.z = Math.PI / 2;
shelfHandle.position.set(0, -0.9, 0.85);
pullOutShelf.add(shelfHandle);

pullOutShelf.position.set(0, -1.5, 0);
cube_mainFridge.add(pullOutShelf);

// INTERNAL SHELVES 
const internalShelfMat = new THREE.MeshStandardMaterial({color: 0xB2B2B2, side: THREE.DoubleSide});
const internalShelf1 = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.05, 1.8), internalShelfMat);
internalShelf1.position.set(0, -1, 0);
fridge.add(internalShelf1);

const internalShelf2 = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.05, 1.8), internalShelfMat);
internalShelf2.position.set(0, -3, 0);
fridge.add(internalShelf2);

// DOORS + HANDLES
const freezerDoorPivot = new THREE.Object3D();
freezerDoorPivot.position.set(2, -1, 1);
fridge.add(freezerDoorPivot);

const freezerDoor = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x999999 })
);
freezerDoor.position.set(-2, 3, 0);
freezerDoorPivot.add(freezerDoor);

const handleMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const freezerHandle = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1, 0.15), handleMat);
freezerHandle.position.set(-1.6, -0.02, 0.3);

const freezerTopBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.3), handleMat);
freezerTopBar.position.set(0, 0.44, -0.1);
const freezerBottomBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.3), handleMat);
freezerBottomBar.position.set(0, -0.44, -0.1);

freezerHandle.add(freezerTopBar);
freezerHandle.add(freezerBottomBar);
freezerDoor.add(freezerHandle);

const mainFridgeDoorPivot = new THREE.Object3D();
mainFridgeDoorPivot.position.set(2, -5, 1);
fridge.add(mainFridgeDoorPivot);

const mainFridgeDoor = new THREE.Mesh(
    new THREE.BoxGeometry(4, 6, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x999999 })
);
mainFridgeDoor.position.set(-2, 3, 0);
mainFridgeDoorPivot.add(mainFridgeDoor);

const mainHandleGroup = new THREE.Group();
const mainVerticalHandle = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.72, 0.15), handleMat);
mainHandleGroup.add(mainVerticalHandle);

const mainTopBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.3), handleMat);
mainTopBar.position.set(0, 0.80, -0.1);
const mainBottomBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.3), handleMat);
mainBottomBar.position.set(0, -0.80, -0.1);

mainHandleGroup.add(mainTopBar);
mainHandleGroup.add(mainBottomBar);
mainHandleGroup.position.set(-1.6, 1.9, 0.3);
mainFridgeDoor.add(mainHandleGroup);

// FLOOR + FEET
const fridgeFloor = new THREE.Mesh(new THREE.BoxGeometry(3.99, 0.05, 2), internalShelfMat);
fridgeFloor.position.set(0, -4.90, 0);
fridge.add(fridgeFloor);

const footGeo = new THREE.BoxGeometry(0.25, 0.2, 2);
const footMat = new THREE.MeshStandardMaterial({color:0x222222});
const footPositions = [[-1.9, -5.08, 0], [1.9, -5.08, 0]];
footPositions.forEach(p => {
    const foot = new THREE.Mesh(footGeo, footMat);
    foot.position.set(p[0], p[1], p[2]);
    fridge.add(foot); 
});   

fridge.position.set(4.7, 1,-1.2);
fridge.scale.set(0.8, 0.8, 0.8);

// =========================
// 🔥 GAS COOKTOP
// =========================
const cooktop = new THREE.Group();
scene.add(cooktop);

const cookBase = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.1, 2),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
);
cooktop.add(cookBase);

const burner1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
);
burner1.position.set(-1.2, 0.10, 0);
cooktop.add(burner1);

const burnerCap1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
);
burnerCap1.position.set(-1.2, 0.20, 0);
cooktop.add(burnerCap1);

const flames1 = new THREE.Group();
cooktop.add(flames1);
for(let i = 0; i < 12; i++){
    const angle = (i / 12) * Math.PI * 2;
    const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.25, 8),
        new THREE.MeshStandardMaterial({
            color: 0x00aaff,
            emissive: 0x0088ff,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.9
        })
    );
    flame.position.set(-1.2 + Math.cos(angle) * 0.45, 0.35, Math.sin(angle) * 0.45);
    flame.rotation.x = Math.PI;
    flames1.add(flame);
}

const burner2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
);
burner2.position.set(1.2, 0.10, 0);
cooktop.add(burner2);

const burnerCap2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
);
burnerCap2.position.set(1.2, 0.20, 0);
cooktop.add(burnerCap2);

const flames2 = new THREE.Group();
cooktop.add(flames2);
for(let i = 0; i < 12; i++){
    const angle = (i / 12) * Math.PI * 2;
    const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.25, 8),
        new THREE.MeshStandardMaterial({
            color: 0x00aaff,
            emissive: 0x0088ff,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.9
        })
    );
    flame.position.set(1.2 + Math.cos(angle) * 0.45, 0.35, Math.sin(angle) * 0.45);
    flame.rotation.x = Math.PI;
    flames2.add(flame);
}

flames1.visible = false;
flames2.visible = false;
cooktop.position.set(-5.7, 0.06, 3.58);
cooktop.scale.set(0.8, 1, 1);
cooktop.rotation.y = Math.PI / 2;

// 🔥 OVEN - COMPLETE
const ovenGroup = new THREE.Group();

// 🏮 OVEN LIGHT
const ovenLight = new THREE.PointLight(0xffaa33, 1.5, 10);
ovenLight.position.set(0, 0, 0.5);
ovenGroup.add(ovenLight);

// 🧱 MAIN OVEN BODY
const ovenGeometry = new THREE.BoxGeometry(3, 2, 2);
const ovenMaterials = [
    new THREE.MeshStandardMaterial({color: 0x777777, side: THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color: 0x777777, side: THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color: 0x777777, side: THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({color: 0x777777, side: THREE.DoubleSide}),
    new THREE.MeshStandardMaterial({
        color: 0x3399ff,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    }),
    new THREE.MeshStandardMaterial({color: 0x777777, side: THREE.DoubleSide})
];
const oven = new THREE.Mesh(ovenGeometry, ovenMaterials);
ovenGroup.add(oven);

const ovenInnerFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.05, 1.9),
    new THREE.MeshStandardMaterial({color: 0x444444})
);
ovenInnerFloor.position.set(0, -0.95, 0);
ovenGroup.add(ovenInnerFloor);

const ovenRackGeo = new THREE.BoxGeometry(0.04, 0.02, 1.9);
const ovenRackMat = new THREE.MeshStandardMaterial({ color: 0x444444 });

const ovenRack1 = new THREE.Mesh(ovenRackGeo, ovenRackMat);
ovenRack1.position.set(1.47, -0.5, 0);
ovenGroup.add(ovenRack1);

const ovenRack2 = new THREE.Mesh(ovenRackGeo, ovenRackMat);
ovenRack2.position.set(-1.47, -0.5, 0);
ovenGroup.add(ovenRack2);

const ovenRack3 = new THREE.Mesh(ovenRackGeo, ovenRackMat);
ovenRack3.position.set(-1.47, 0.3, 0);
ovenGroup.add(ovenRack3);

const ovenRack4 = new THREE.Mesh(ovenRackGeo, ovenRackMat);
ovenRack4.position.set(1.47, 0.3, 0);
ovenGroup.add(ovenRack4);

// 🚪 OVEN DOOR
const ovenDoorPivot = new THREE.Object3D();
ovenDoorPivot.position.set(0,-1, 1);

const ovenDoor = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.05),
    new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.4
    })
);
ovenDoor.position.set(0, 1, 0);
ovenDoorPivot.add(ovenDoor);

const ovenHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16),
    new THREE.MeshStandardMaterial({color: 0xffffff})
);
ovenHandle.rotation.z = Math.PI / 2;
ovenHandle.position.set(0, 0.8, 0.08);
ovenDoor.add(ovenHandle);

ovenGroup.add(ovenDoorPivot);

const ovenFeetPositions = [
    [-1.3, -1.15, -0.85],
    [1.3, -1.15, -0.85],
    [-1.3, -1.15, 0.85],
    [1.3, -1.15, 0.85]
];
const ovenFootGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.25, 8);
const ovenFootMat = new THREE.MeshStandardMaterial({color: 0x333333});
ovenFeetPositions.forEach(pos => {
    const foot = new THREE.Mesh(ovenFootGeo, ovenFootMat);
    foot.position.set(pos[0], pos[1], pos[2]);
    foot.rotation.x = Math.PI;
    ovenGroup.add(foot);
});

const smokeParticles = [];
function spawnSmoke(){
    const geo = new THREE.SphereGeometry(0.1, 8, 8);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.6
    });
    const smoke = new THREE.Mesh(geo, mat);
    smoke.position.set(
        (Math.random() - 0.5) * 1.5,
        -0.5 + Math.random(),
        0.5
    );
    ovenGroup.add(smoke);
    smokeParticles.push(smoke);
}

ovenGroup.rotation.y = Math.PI / 2; 
scene.add(ovenGroup);
ovenGroup.position.set(-5.8,-1.43, 3.5);
ovenGroup.scale.set(1.2, 1.35, 1.1);

// =========================
// 🎮 STATE VARIABLES
// =========================
let rightDoorOpen = false;
let leftDoorOpen = false;
let freezerOpen = false;
let mainFridgeOpen = false;
let shelfOpen = false;
let ovenOpen = false;
let burner1On = false;
let burner2On = false;

//GLB LOADER
// SKIN
const loaderskin = new GLTFLoader();

loaderskin.load('./models/kitchen_sink.glb', (gltf) => {
    const skin = gltf.scene;
    // Scale skin (adjust as needed)
    skin.scale.set(3, 3, 2.6);

    // Put skin ON TOP of desk
    skin.position.set(-1, 0.1, -1);
 
    scene.add(skin);
});

// tree

const loadertree = new GLTFLoader();

loadertree.load('./models/tree.glb', (gltf) => {
    const tree = gltf.scene;
    
    // Scale tree (adjust as needed)
    tree.scale.set(0.35, 0.35, 0.35);
    
    // Put tree ON TOP of desk
    tree.position.set(
        desk.position.x,
        desk.position.y + (desk.scale.y * 0.5) + (tree.scale.y * 0.5),
        desk.position.z
    );
    tree.position.set(-5.9, 0.4, -1.3);  
    scene.add(tree);
    
}, undefined, (error) => {
    console.error('Tree load failed:', error);
});




// =========================
// 🖱️ CLICK SYSTEM - FULL (TREASURY + KITCHEN)
// =========================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (e) => {
    mouse.x = (e.clientX / window.innerWidth)*2 - 1;
    mouse.y = -(e.clientY / window.innerHeight)*2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    // 🔥 TREASURY SYSTEM - NEW!
    const treasuryHits = raycaster.intersectObject(treasuryfullGroup, true);
    if (treasuryHits.length > 0) {
        const hitObject = treasuryHits[0].object;
        const target = allTreasuries.find(t => 
            t.door === hitObject || 
            t.door.children.includes(hitObject)
        );
        if (target) {
            target.open = !target.open;
        }
    }

    // 🟤 DESK
    if (raycaster.intersectObject(kitchen_desk_right_side_Door).length > 0) {
        rightDoorOpen = !rightDoorOpen;
    }
    if (raycaster.intersectObject(kitchen_desk_left_side_Door).length > 0) {
        leftDoorOpen = !leftDoorOpen;
    }

    // ❄️ FRIDGE
    if (raycaster.intersectObject(freezerDoor).length > 0) {
        freezerOpen = !freezerOpen;
    }
    if (raycaster.intersectObject(mainFridgeDoor).length > 0) {
        mainFridgeOpen = !mainFridgeOpen;
    }
    if (raycaster.intersectObject(pullOutShelf, true).length > 0) {
        shelfOpen = !shelfOpen;
    }

    // 🔥 OVEN
    if (raycaster.intersectObject(ovenDoor).length > 0) {
        ovenOpen = !ovenOpen;
    }

    // 🔥 COOKTOP
    if (raycaster.intersectObject(burner1).length > 0) {
        burner1On = !burner1On;
        flames1.visible = burner1On;
    }
    if (raycaster.intersectObject(burner2).length > 0) {
        burner2On = !burner2On;
        flames2.visible = burner2On;
    }
});



// 🔥 ANIMATION LOOP - FULL
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    // 🔥 wall cabinet  ANIMATION - NEW!
    allTreasuries.forEach(t => {
        const target = t.open ? Math.PI/2 : 0;
        t.pivot.rotation.x += (target - t.pivot.rotation.x) * 0.1;
    });

    // 🟤 DESK
    doorPivotright.rotation.x += ((rightDoorOpen ? Math.PI/2 : 0) - doorPivotright.rotation.x) * 0.1;
    doorPivotleft.rotation.x += ((leftDoorOpen ? Math.PI/2 : 0) - doorPivotleft.rotation.x) * 0.1;

    // ❄️ FRIDGE
    freezerDoorPivot.rotation.y += ((freezerOpen ? Math.PI/2 : 0) - freezerDoorPivot.rotation.y) * 0.05;
    mainFridgeDoorPivot.rotation.y += ((mainFridgeOpen ? Math.PI/2 : 0) - mainFridgeDoorPivot.rotation.y) * 0.05;

    freezerLamp1.intensity = freezerOpen ? 5 : 0;
    fridgeLamp2.intensity = mainFridgeOpen ? 5 : 0;
    freezerBulb1.material.emissiveIntensity = freezerOpen ? 2 : 0;
    fridgeBulb2.material.emissiveIntensity = mainFridgeOpen ? 2 : 0;
    pullOutShelf.position.z += ((shelfOpen ? 1.5 : 0) - pullOutShelf.position.z) * 0.08;

    // 🔥 OVEN
    ovenDoorPivot.rotation.x += ((ovenOpen ? Math.PI/2 : 0) - ovenDoorPivot.rotation.x) * 0.1;
    ovenLight.intensity += ((ovenOpen ? 50 : 0) - ovenLight.intensity) * 0.1;

    if (ovenOpen && Math.random() < 0.3) spawnSmoke();

    // SMOKE
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const s = smokeParticles[i];
        s.position.y += 0.02;
        s.position.z += 0.01;
        s.material.opacity -= 0.01;
        s.scale.x += 0.01;
        s.scale.y += 0.01;
        s.scale.z += 0.01;
        if (s.material.opacity <= 0) {
            ovenGroup.remove(s);
            smokeParticles.splice(i, 1);
        }
    }

    // 🔥 BURNERS
    if (burner1On) {
        flames1.children.forEach(f => {
            f.scale.y = 0.5 + Math.random() * 0.5;
            f.position.y = 0.35 + Math.random() * 0.03;
            f.material.emissiveIntensity = -2;
            f.material.color.setRGB(0, 0.6 + Math.random() * 0.4, 1);
        });
    }
    if (burner2On) {
        flames2.children.forEach(f => {
            f.scale.y = 0.5 + Math.random() * 0.5;
            f.position.y = 0.35 + Math.random() * 0.03;
            f.material.emissiveIntensity = -2;
            f.material.color.setRGB(0, 0.6 + Math.random() * 0.4, 1);
        });
    }
    
    renderer.render(scene, camera);
}
animate();

// RESIZE
window.addEventListener("resize",()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});