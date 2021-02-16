import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom';

import './Theme.css';

import'@babylonjs/loaders/glTF'
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import SceneComponent from './SceneComponent';
import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';

let container;
let box;



class VirtualPet extends React.Component {

    
render() {

    const { location } = this.props;
    if (location.pathname.match('/home')){
      return null;
    }

    return (
        
        <div className='VirtualPet' >
            <SceneComponent antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='my-canvas' />
        </div>
    );
  }


    onSceneReady = scene => {

      // Default Environment
      const environment =  scene.createDefaultEnvironment({ 
        createSkybox: false,
        createGround: true,
        groundSize: 500,
        groundColor: BABYLON.Color3.White(),
        enableGroundShadow: false,
        groundYBias: 0.01
      });

      // scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
      // scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
      // scene.fogDensity = .05;

      let ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene);

      var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.diffuseTexture = new BABYLON.Texture("models/images/grass.jpg", scene);
        myMaterial.diffuseTexture.hasAlpha = true;
        myMaterial.alpha = 0.8;

        myMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.9, 0.6);
        ground.material = myMaterial

      


        //Skybox--------------------------------------------------
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/images/TropicalSunnyDay", scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, .3, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            skybox.material = skyboxMaterial;

        //Camera--------------------------------------------------
        const camera = new ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2, 12, new Vector3(0, 12, -0), scene);
          scene.activeCamera.lowerRadiusLimit = 7;
          scene.activeCamera.upperRadiusLimit = 5;
          scene.activeCamera.alpha = 4;
          scene.activeCamera.beta = 2.5;
          scene.activeCamera.wheelPrecision = 5;
          scene.activeCamera.upperBetaLimit=1.5; //Math.PI*(0)/180;
          scene.activeCamera.lowerBetaLimit=.5;
          scene.activeCamera.lowerAlphaLimit = Math.PI * 1.3;
          scene.activeCamera.upperAlphaLimit = Math.PI * 1.7;
          
        const canvas = scene.getEngine().getRenderingCanvas();
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        //Light--------------------------------------------------
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1;


        
        // console.log(scene.animationGroups.length);
        // scene.animationGroups[3].stop();
        // scene.animationGroups[0].start(true);


        BABYLON.SceneLoader.LoadAssetContainer("../models/", "sprig-wave.glb", scene, function (container) {
            const meshes = container.meshes;
            const materials = container.materials;

            const sprig = meshes[0]
            const sprigM = materials[0]

            scene.beforeRender = () => {
                sprig.position = new BABYLON.Vector3(1.5, 6.5, 5);
                sprig.rotation = new BABYLON.Vector3(0, 2.8, 0);

                sprigM.roughness  = 0.4;
                // sprigM.diffuseColor = new BABYLON.Color3(0, .3, 0);
                // sprigM.specular = BABYLON.Color3.Black();


                }
            // Adds all elements to the scene
            container.addAllToScene();

        });

        
        BABYLON.SceneLoader.LoadAssetContainer("../models/", "focus_room.glb", scene, function (container) {
          const meshes = container.meshes;
          const materials = container.materials;

          const room = meshes[0]


          // scene.animationGroups.forEach(anim => {
          //   console.log(anim)
          // })
          // console.log(scene.animationGroups.length)
        

          scene.beforeRender = () => {
            room.scaling = new BABYLON.Vector3(-5, 4, 5);
            room.position = new BABYLON.Vector3(0, 1.8, 30);
            


              // room.rotation.y = 1.57;
              // room.rotationQuaternion = undefined;
              //room.rotation = new BABYLON.Vector3(0, 3.14, 0);

              }
          // Adds all elements to the scene
          container.addAllToScene();
          const room_fan_1 = scene.animationGroups.find(a => a.name === 'Take 001');
          room_fan_1.start(true)
          const room_fan_2 = scene.animationGroups.find(a => a.name === 'KeyAction');
          room_fan_2.start(true)

          const desk_plant = scene.animationGroups.find(a => a.name === 'Key.001Action');
          desk_plant.start(true)

          const tree = scene.animationGroups.find(a => a.name === 'ArmatureAction');
          tree.start(true)

          const leaf_1 = scene.animationGroups.find(a => a.name === 'Leaf.001Action');
          leaf_1.start(true)
          const leaf_1_1 = scene.animationGroups.find(a => a.name === 'Leaf.001Action.001');
          leaf_1_1.start(true)

          const leaf_2 = scene.animationGroups.find(a => a.name === 'Leaf.002Action');
          leaf_2.start(true)
          const leaf_2_1 = scene.animationGroups.find(a => a.name === 'Leaf.002Action.001');
          leaf_2_1.start(true)

          const leaf_3 = scene.animationGroups.find(a => a.name === 'Leaf.003Action');
          leaf_3.start(true)
          const leaf_3_1 = scene.animationGroups.find(a => a.name === 'Leaf.003Action.001');
          leaf_3_1.start(true)

          const leaf_4 = scene.animationGroups.find(a => a.name === 'Leaf.004Action');
          leaf_4.start(true)
          const leaf_4_1 = scene.animationGroups.find(a => a.name === 'Leaf.004Action.001');
          leaf_4_1.start(true)

          const leaf_5 = scene.animationGroups.find(a => a.name === 'Leaf.005Action');
          leaf_5.start(true)
          const leaf_5_1 = scene.animationGroups.find(a => a.name === 'Leaf.005Action.001');
          leaf_5_1.start(true)

          const leaf_6 = scene.animationGroups.find(a => a.name === 'Leaf.006Action');
          leaf_6.start(true)
          const leaf_6_1 = scene.animationGroups.find(a => a.name === 'Leaf.006Action.001');
          leaf_6_1.start(true)
      });
  }

    //Will run on every frame render.  We are spinning the box on y-axis.
    //   onRender = scene => {
    //       if (box !== undefined) {
    //       var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    //       const rpm = 10;
    //       box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    //       }
    // }


}
export default withRouter(VirtualPet);