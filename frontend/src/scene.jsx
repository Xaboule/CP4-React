import React, { Component, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import Grid from './grid.js';
import Grid90 from './grid90';
import { BackSide, DoubleSide } from 'three';
import gsap from 'gsap';
import './style.css';

const ThreeScene = ({ ball1, ball2 }) => {
  const mountRef = useRef(null);

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

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
    mainLight.position.y = 8;
    mainLight.castShadow = true;
    mainLight.shadow.radius = 1;
    // const helper = new THREE.DirectionalLightHelper(mainLight, 5)
    scene.add(mainLight);

    const pointLight = new THREE.SpotLight(0xf000f0, 1);
    pointLight.position.y = 5;
    pointLight.position.x = 0;
    pointLight.position.z = 0;
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
    const planeMat = new THREE.MeshStandardMaterial({
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
      new THREE.MeshStandardMaterial({
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
    let played = 0;

    const player1 = {
      color: ball1,
    };
    const player2 = {
      color: ball2,
    };

    const objectsToUpdate = [];

    const world = new CANNON.World();
    world.gravity.set(0, -14.82, 0);

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

    const radius = 0.7;

    const createSphere = (radius, position) => {
      // Three.js mesh
      // played%2 !=0 mesh.name = player1 : mesh.name = player2
      const mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 30, 30),
        new THREE.MeshStandardMaterial({
          color: played % 2 != 0 ? player1.color : player2.color,
          roughness: 0.4,
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

    const arrBall = [];

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

    const rayOr = [
      //L->R
      [-4, -0.3, -3],
      [-4, -0.3, -3],
      [-4, -0.3, -1],
      [-4, -0.3, 1],
      [-4, -0.3, 3],
      // //Diag L->R
      [-4, -0.3, -4],
      [4, -0.3, -4],
      // //Back->Front
      [-3, -0.3, -4],
      [-1, -0.3, -4],
      [1, -0.3, -4],
      [3, -0.3, -4],
      //L->R
      [-4, 1.3, -3],
      [-4, 1.3, -1],
      [-4, 1.3, 1],
      [-4, 1.3, 3],
      //Diag L->R
      [-4, 1.3, -4],
      [4, 1.3, -4],
      //Back->Front
      [-3, 1.3, -4],
      [-1, 1.3, -4],
      [1, 1.3, -4],
      [3, 1.3, -4],
      // //L->R
      [-4, 2.3, -3],
      [-4, 2.3, -1],
      [-4, 2.3, 1],
      [-4, 2.3, 3],
      //Diag L->R
      [-4, 2.3, -4],
      [4, 2.3, -4],
      //Back->Front
      [-3, 2.3, -4],
      [-1, 2.3, -4],
      [1, 2.3, -4],
      [3, 2.3, -4],
      // //L->R
      [-4, 4, -3],
      [-4, 4, -1],
      [-4, 4, 1],
      [-4, 4, 3],
      //Diag L->R
      [-4, 4, -4],
      [4, 4, -4],
      //Back->Front
      [-3, 4, -4],
      [-1, 4, -4],
      [1, 4, -4],
      [3, 4, -4],

      // ////Down->Up
      [-3, -1, -3],
      [-1, -1, -3],
      [1, -1, -3],
      [3, -1, -3],
      [-3, -1, -1],
      [-1, -1, -1],
      [1, -1, -1],
      [3, -1, -1],
      [-3, -1, 1],
      [-1, -1, 1],
      [1, -1, 1],
      [3, -1, 1],
      [-3, -1, 3],
      [-1, -1, 3],
      [1, -1, 3],
      [3, -1, 3],

      //down->up Diag Back->front
      [-3, -2, -5],
      [-1, -2, -5],
      [1, -2, -5],
      [3, -2, -5],
      //Up->Down Diag Back->front
      [-3, 6, -5],
      [-1, 6, -5],
      [1, 6, -5],
      [3, 6, -5],

      //down->up Diag Left->Right
      [-5, -2, -3],
      [-5, -2, -1],
      [-5, -2, 1],
      [-5, -2, 3],

      //Up-Down Diag Left->Right
      [-5, 6, -3],
      [-5, 6, -1],
      [-5, 6, 1],
      [-5, 6, 3],

      ///// DIAG BY DIAG
      [-4, 5, -4],
      [-4, 5, -4],
      [-4, 5, 4],
      [-5, -2, -4],
      [-5, -2, 4],
    ];
    const rayDir = [
      //L->R
      [+4, 0, 0],
      [+4, 0, 0],
      [+4, 0, 0],
      [+4, 0, 0],
      [+4, 0, 0],
      // //Diag L->R
      [+4, 0, 4],
      [-4, 0, 4],
      // //Back->Front
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      //L->R
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      //Diag L->R
      [+4, 0, 4],
      [-4, 0, 4],
      //Back->Front
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      //L->R
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      //Diag L->R
      [+4, 0, 4],
      [-4, 0, 4],
      //Back->Front
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      // //L->R
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      [+3, 0, 0],
      //Diag L->R
      [+4, 0, 4],
      [-4, 0, 4],
      //Back->Front
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],
      [0, 0, 3],

      // //Down->Up
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],
      [0, 6, 0],

      //down->up Diag Back->front
      [0, 4, 5],
      [0, 4, 5],
      [0, 4, 5],
      [0, 4, 5],

      //Up->Down Diag Back->front
      [0, -4, 5],
      [0, -4, 5],
      [0, -4, 5],
      [0, -4, 5],

      //down->up Diag Left-Right
      [5, 4, 0],
      [5, 4, 0],
      [5, 4, 0],
      [5, 4, 0],

      //Up->Down Diag Left-Right
      [5, -4, 0],
      [5, -4, 0],
      [5, -4, 0],
      [5, -4, 0],

      ///// DIAG BY DIAG
      [3, -2, 3],
      [3, -2, 3],
      [3, -2, -3],
      [5, 4, 4],
      [5, 4, -4],
    ];
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);
    /**
     * Animate
 console.log(gridHelper);
 */
    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    // Rays()
    let stuff = 0;
    const tick = () => {
      if (stuff > 75) {
        // setTimeout(()=> {}, '2000')
        stuff = 0;
      }

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      oldElapsedTime = elapsedTime;

      controls.update();

      raycaster.setFromCamera(mouse, camera);
      // console.log(raycaster)
      // console.log(raycaster.ray.direction)
      // const rayOrigin2 = new THREE.Vector3(-4, 0, 4);
      // const rayDirection2 = new THREE.Vector3(9, 0, -0.01);
      if (stuff) {
        const rayOrigin2 = new THREE.Vector3(...rayOr[stuff]);
        const rayDirection2 = new THREE.Vector3(...rayDir[stuff]);
        rayDirection2.normalize();
        raycaster2.set(rayOrigin2, rayDirection2);
        // console.log(rayOrigin2, rayDirection2)

        if (arrBall.length > 1) {
          // console.log(raycaster2.ray.origin)
          let arrow = new THREE.ArrowHelper(
            raycaster2.ray.direction,
            raycaster2.ray.origin,
            8,
            0xff0000
          );
          scene.add(arrow);

          let intersection2 = raycaster2.intersectObjects(arrBall);
          for (const obj of arrBall) {
            // obj.material.color = new THREE.Color('#000000')
            for (const intersect of intersection2) {
              // if (intersection2.length > 1) {
              //   intersect.object.material.color = new THREE.Color('#ffffff');
              // }
              if (intersection2.length === 4) {
                let flute = 0;
                // console.log(intersection2);
                for (let i = 0; i < intersection2.length; i++) {
                  if (intersection2[i].object.name === 'p1') {
                    flute += 2;
                  } else if (intersection2[i].object.name === 'p2') {
                    flute -= 2;
                  }
                }
                // console.log(flute);
                if (flute === 8 || flute === -8) {
                  console.log('OUUUUUUUUUUUUI');
                }
                // intersect.object.material.color = new THREE.Color('#ff00ff');
                // console.log(intersection2)
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
      document.addEventListener('touchstart', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      // document.addEventListener('touchend', onMouseUp);

      if (intersection[0] !== undefined && clicked === 1) {
        // console.log(clicked)
        // for(let i = 0; i< rayOr.length; i++){
        //   raycaster.set(rayOr[i], rayDir[i])
        //   // console.log(rayOr[i], rayDir[i])
        //   setTimeout(()=>{}, '100')
        // }
        clicked = 0;
        removeEventListener('mousedown', onMouseDown);
        let pos = new THREE.Vector3(
          intersection[0].object.position.x,
          intersection[0].object.position.y + 5,
          intersection[0].object.position.z
        );
        const sphere = createSphere(radius, pos);
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
      // raycaster2.set(rayOrigin2, rayDirection2);

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
