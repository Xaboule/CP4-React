import React, { Component, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import Grid from './grid.js';
import Grid90 from './grid90';
import { BackSide, DoubleSide, SphereGeometry } from 'three';
import './style.css';
import Stats from 'stats.js';
import normalus from './assets/needles_01_normal.jpg';
import {rayOr, rayDir} from './rays'
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const ThreeScene = ({
  ball1,
  ball2,
  setWin1,
  setWin2,
  player1,
  setPlayer1,
  player2,
  setPlayer2,
}) => {
  const mountRef = useRef(null);
  
  const [turn, setTurn] = useState(false)
  useEffect(() => {
    /**
     * Base
     */

    // Canvas
    const canvas = document.getElementById('myCanvas');
    // console.log(canvas)

    // Scene
    const scene = new THREE.Scene();

    const raycaster = new THREE.Raycaster();
    //lights
    const textureloader = new THREE.TextureLoader();
    const clearcoatNormal = textureloader.load(normalus);
    const BluePlayDo = textureloader.load('./assets/matcap/BluePlayDo.png ')
    clearcoatNormal.wrapS = THREE.RepeatWrapping;
    clearcoatNormal.wrapT = THREE.RepeatWrapping;
    clearcoatNormal.magFilter = THREE.NearestFilter
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('frontend/src/assets/cubeimgs/');

    var textureCube = loader.load([
      'posx.jpg',
      'negx.jpg',
      'posy.jpg',
      'negy.jpg',
      'posz.jpg',
      'negz.jpg',
    ]);

    const mainLight = new THREE.AmbientLight(0xffffff, 0.8);
    mainLight.position.y = 8;
    // mainLight.castShadow = true;
    // mainLight.shadow.radius = 1;
    // const helper = new THREE.DirectionalLightHelper(mainLight, 5)
    scene.add(mainLight);

    const pointLight = new THREE.DirectionalLight(0xf000f0, 1);
    pointLight.position.y = 5;
    pointLight.position.x = 0;
    pointLight.position.z = -8;
    pointLight.penumbra = 0.2;
    pointLight.castShadow = true;
    scene.add(pointLight);

    scene.fog = new THREE.Fog(0xffffff, 5, 50);

    const caseBox = new THREE.Mesh(
      new THREE.BoxBufferGeometry(50, 50, 50),
      new THREE.MeshStandardMaterial({ color: '#ffff00', side: BackSide })
    );

    scene.add(caseBox);
    ///////// Plane
    const planeMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });
    const plane1 = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 'pink' })
    );
    plane1.rotation.x = -Math.PI * 0.5;
    plane1.position.y = -1.0002;
    scene.add(plane1);
    const plane2 = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(8, 8),
      new THREE.MeshStandardMaterial({
        color: 'grey',
        metalness: 0.7,
        roughness: 0,
      })
    );
    plane2.rotation.x = -Math.PI * 0.5;
    plane2.position.y = -1;
    plane2.receiveShadow = true;
    scene.add(plane2);

    //// Cubz
    const allCells = new THREE.Group();
    scene.add(allCells);

    const cubeGeo = new THREE.BoxBufferGeometry(1.8, 3, 1.8);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      side: DoubleSide,
      opacity: 0,
    });

    let cellsToTest = [];
    ////////////////////1ST ROW
    const cube1 = new THREE.Mesh(cubeGeo, cubeMat);
    cube1.position.set(-3, 0.5, 3);
    allCells.add(cube1);
    cellsToTest.push(cube1);

    const cube2 = new THREE.Mesh(cubeGeo, cubeMat);
    cube2.position.set(-1, 0.5, 3);
    allCells.add(cube2);
    cellsToTest.push(cube2);

    const cube3 = new THREE.Mesh(cubeGeo, cubeMat);
    cube3.position.set(1, 0.5, 3);
    allCells.add(cube3);
    cellsToTest.push(cube3);

    const cube4 = new THREE.Mesh(cubeGeo, cubeMat);
    cube4.position.set(3, 0.5, 3);
    allCells.add(cube4);
    cellsToTest.push(cube4);

    /////////////// 2ND ROW
    const cube5 = new THREE.Mesh(cubeGeo, cubeMat);
    cube5.position.set(-3, 0.5, 1);
    allCells.add(cube5);
    cellsToTest.push(cube5);

    const cube6 = new THREE.Mesh(cubeGeo, cubeMat);
    cube6.position.set(-1, 0.5, 1);
    allCells.add(cube6);
    cellsToTest.push(cube6);

    const cube7 = new THREE.Mesh(cubeGeo, cubeMat);
    cube7.position.set(1, 0.5, 1);
    allCells.add(cube7);
    cellsToTest.push(cube7);

    const cube8 = new THREE.Mesh(cubeGeo, cubeMat);
    cube8.position.set(3, 0.5, 1);
    allCells.add(cube8);
    cellsToTest.push(cube8);
    ///////////////////////////3RD ROW

    const cube9 = new THREE.Mesh(cubeGeo, cubeMat);
    cube9.position.set(-3, 0.5, -1);
    allCells.add(cube9);
    cellsToTest.push(cube9);

    const cube10 = new THREE.Mesh(cubeGeo, cubeMat);
    cube10.position.set(-1, 0.5, -1);
    allCells.add(cube10);
    cellsToTest.push(cube10);

    const cube11 = new THREE.Mesh(cubeGeo, cubeMat);
    cube11.position.set(1, 0.5, -1);
    allCells.add(cube11);
    cellsToTest.push(cube11);

    const cube12 = new THREE.Mesh(cubeGeo, cubeMat);
    cube12.position.set(3, 0.5, -1);
    allCells.add(cube12);
    cellsToTest.push(cube12);

    //////////////////////4TH ROW

    const cube13 = new THREE.Mesh(cubeGeo, cubeMat);
    cube13.position.set(-3, 0.5, -3);
    allCells.add(cube13);
    cellsToTest.push(cube13);

    const cube14 = new THREE.Mesh(cubeGeo, cubeMat);
    cube14.position.set(-1, 0.5, -3);
    allCells.add(cube14);
    cellsToTest.push(cube14);

    const cube15 = new THREE.Mesh(cubeGeo, cubeMat);
    cube15.position.set(1, 0.5, -3);
    allCells.add(cube15);
    cellsToTest.push(cube15);

    const cube16 = new THREE.Mesh(cubeGeo, cubeMat);
    cube16.position.set(3, 0.5, -3);
    allCells.add(cube16);
    cellsToTest.push(cube16);

    // console.log(cellsToTest);

    const lightTile = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0,
      })
    );
    lightTile.rotation.x = -Math.PI * 0.5;

    scene.add(lightTile);
    /**
     *
     *
     *
     *
     * Objects
     */
    function getRandomInt() {
      return Math.round(Math.random() * 1);
    }
    let setplay = 0;
    let played = setplay + getRandomInt();
    console.log('playedTop', played);

    const player1 = {
      color: ball1,
    };
    const player2 = {
      color: ball2,
    };

    const objectsToUpdate = [];

    const world = new CANNON.World();
    world.gravity.set(0, -14.82, 0);
    world.allowSleep = true;

    // gui.add(world.gravity)
    const cannonDebugger = new CannonDebugger(scene, world, {
      // options...
      color: 0x00ff00,
      scale: 1,
    });

    const defaultMaterial = new CANNON.Material('default');
    const defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.3,
      }
    );
    world.addContactMaterial(defaultContactMaterial);

    const floorBody = new CANNON.Body();
    const floorShape = new CANNON.Plane(new CANNON.Vec3(10, 10));
    floorBody.material = defaultContactMaterial;
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    floorBody.position.y = -1;
    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    world.addBody(floorBody);

    const debugObject = {};

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight - 80,
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight - 80;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const mouse = new THREE.Vector2(1, 1);
    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 6;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    // Controls
    const controls = new OrbitControls(camera, myCanvas);
    controls.enableDamping = true;
    controls.maxDistance = 20;
    controls.minDistance = 7;
    controls.maxPolarAngle = Math.PI / 2;

    /**
     * Renderer
     */
    // renderer.physicallyCorrectLights = true;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // mountRef.current.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    document.addEventListener('mousemove', onMouseMove);

    Grid(world, [0, 2, 0]);
    Grid(world, [0, 2, 2]);
    Grid(world, [0, 2, -2]);
    Grid(world, [0, 2, -4]);
    Grid(world, [0, 2, 4]);
    Grid90(world, [-4, 2, 0]);
    Grid90(world, [-2, 2, 0]);
    Grid90(world, [0, 2, 0]);
    Grid90(world, [2, 2, 0]);
    Grid90(world, [4, 2, 0]);

    let arrBall = [];

    let clicked = 0;

    function onMouseDown(event) {
      // console.log('mousedown');
      event.preventDefault();
      clicked = 1;
    }
    function onMouseUp(event) {
      // console.log('mouseup');
      clicked = 0;
      // console.log(arrBall);
    }
    function onMouseMove(event) {
      // event.preventDefault();

      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    }

    /////RAYCASTER MOVING BACK & FORTH ON Z-AXIS
    const raycaster2 = new THREE.Raycaster();

   
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const radius = 0.7;

    const createSphere = (radius, position) => {
      // Three.js mesh
      console.log(clearcoatNormal);
      const mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 30, 30),
        new THREE.MeshMatcapMaterial({
          color: played % 2 != 0 ? player1.color : player2.color,
          // matcap : BluePlayDo,
          // normalMap : clearcoatNormal,
          roughness: 0.8,
          clearcoat: 1,
          // clearcoatRoughness: 0.1,
          reflectivity: 0.2,
          // clearcoatNormalMap: clearcoatNormal,
          // clearcoatNormalScale: new THREE.Vector2(1.3,-2),
          metalness: 0.7,
          // envMap: textureCube,
          // envMapIntensity: 0.2,
          //   wireframe: true,
        })
      );
      mesh.castShadow = true;
      mesh.position.copy(position);
      scene.add(mesh);

      // Cannon.js body
      const shape = new CANNON.Sphere(radius);

      const body = new CANNON.Body({
        mass: 3,
        position: position,
        shape: shape,
        material: defaultMaterial,
      });
      body.addShape(shape);
      // body.position.copy(mesh.position)

      mesh.position.copy(body.position);
      world.addBody(body);
      objectsToUpdate.push({ mesh, body });

      return mesh;
    };
    /**
     * Animate
     */
    function clearScene() {
      var to_remove = [];
      let removebody = [];
      scene.traverse(function (child) {
        // console.log(child)
        if (
          child instanceof THREE.Mesh &&
          !child.userData.keepMe === true &&
          child.geometry.type === 'SphereGeometry'
        ) {
          to_remove.push(child);
        }
      });

      for (let w = 0; w < world.bodies.length; w++) {
        for (let wi = 0; wi < world.bodies[w].shapes.length; wi++) {
          if (world.bodies[w].shapes[wi].radius === 0.7) {
            removebody.push(world.bodies[w]);
          }
        }
        for (let i = 0; i < removebody.length; i++) {
          world.removeBody(removebody[i]);
        }
      }

      for (var i = 0; i < to_remove.length; i++) {
        scene.remove(to_remove[i]);
      }
      setplay = 0;
      played = setplay + getRandomInt();
      console.log('played', played);
    }

    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    // Rays()
    let stuff = 0;
    const tick = () => {
      stats.begin();
      if (stuff > 76) {
        setTurn(false)
        stuff = 0;
      }

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      oldElapsedTime = elapsedTime;

      controls.update();

      raycaster.setFromCamera(mouse, camera);

      if (stuff) {
        const rayOrigin2 = new THREE.Vector3(...rayOr[stuff]);
        const rayDirection2 = new THREE.Vector3(...rayDir[stuff]);
        rayDirection2.normalize();
        raycaster2.set(rayOrigin2, rayDirection2);
        // console.log(rayOrigin2, rayDirection2)
        let arrows = []
        if (arrBall.length > 1) {
          let arrow = new THREE.ArrowHelper(
            raycaster2.ray.direction,
            raycaster2.ray.origin,
            8,
            0xff0000
          );
          scene.add(arrow);

      

          let intersection2 = raycaster2.intersectObjects(arrBall);
          for (const obj of arrBall) {
            for (const intersect of intersection2) {
              if (intersection2.length === 4) {
                let flute = 0;
                for (let i = 0; i < intersection2.length; i++) {
                  if (intersection2[i].object.name === 'p1') {
                    flute += 2;
                  } else if (intersection2[i].object.name === 'p2') {
                    flute -= 2;
                  }
                }

                if (flute === 8) {
                  // console.log('ouimadamebonjour');
                  setWin1(true);
                  clicked = 2;
                } else if (flute === -8) {
                  // console.log('ouimadamebonjour');
                  setWin2(true);
                  clicked = 2;
                }
                if (clicked === 2) {
                  setTimeout(() => {
                    clearScene();
                    // played = 0
                    setWin1(false);
                    setWin2(false);
                    flute = 0;
                    arrBall = [];
                  }, '2000');
                }
              }
              // console.log('interlenght', intersection2.length)
            }
          }
        }
      }
      const intersection = raycaster.intersectObjects(cellsToTest);
      for (const object of cellsToTest) {
        object.material = cubeMat;
        lightTile.material = planeMat;
      }
      if (intersection.length > 0) {
        // console.log('intersect111', intersection)
        lightTile.position.set(
          intersection[0].object.position.x,
          -0.9999,
          intersection[0].object.position.z
        );
        lightTile.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          emissive: '#ffffff',
          emissiveIntensity: 2,
        });
        intersection[0].object.material = new THREE.MeshBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.3,
        });
      }
      // console.log(arrBall)
      for (let i = 0; i < arrBall.length; i++) {
        arrBall[i].rotation.x = Math.sin(elapsedTime * 2) * 2;
      }

      document.addEventListener('mousedown', onMouseDown);
      if (intersection[0] !== undefined){document.addEventListener('touchstart', onMouseDown);}
      document.addEventListener('mouseup', onMouseUp);
      if (intersection[0] !== undefined){document.addEventListener('touchend', onMouseUp);}

      if (intersection[0] !== undefined && clicked === 1) {
        clicked = 0;
        setTurn(true)
        removeEventListener('mousedown', onMouseDown);
        let pos = new THREE.Vector3(
          intersection[0].object.position.x,
          intersection[0].object.position.y + 5,
          intersection[0].object.position.z
        );
        const sphere = createSphere(radius, pos);
        console.log(played);
        // console.log('Sphere Created');
        played % 2 != 0 ? (sphere.name = 'p1') : (sphere.name = 'p2');
        // console.log(sphere)
        arrBall.push(sphere);
        played += 1;
      } else null;
      if (clicked > 1 && clicked !== 0) {
        clicked = 0;
        setTimeout(() => {}, '50');
      }

      for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position);
        object.mesh.quaternion.copy(object.body.quaternion);
      }

      stuff++;

      world.step(1 / 60, deltaTime, 3);
      // Update controls

      // cannonDebugger.update();
      // Render
      renderer.render(scene, camera);
      THREE.Cache.clear()
      stats.end();
      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
    // return () => mountRef.current.removeChild(renderer.domElement);
    // }
  }, []);

  return (
    <>
      <div>
        <canvas id='myCanvas' />
      </div>
    </>
  );
};
export default ThreeScene;
