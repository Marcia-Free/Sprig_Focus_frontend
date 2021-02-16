import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom';

import './Theme.css';

import'@babylonjs/loaders/glTF'
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import SceneComponent from './SceneComponent';
import { UniversalCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';

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
      var environment =  scene.createDefaultEnvironment({ 
        createSkybox: false,
        createGround: true,
        groundSize: 200,
        groundColor: BABYLON.Color3.White(),
        enableGroundShadow: true, 
        groundYBias: 1 
});

          //Skybox--------------------------------------------------
          var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
          var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
          skyboxMaterial.backFaceCulling = false;
          skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("models/images/TropicalSunnyDay", scene);
          skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
          skyboxMaterial.diffuseColor = new BABYLON.Color3(0, .3, 0);
          skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
          skybox.material = skyboxMaterial;

        // This creates and positions a free camera (non-mesh)
        const camera = new UniversalCamera("camera1", new Vector3(0, 8, -20), scene);
        
        const canvas = scene.getEngine().getRenderingCanvas();
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        //Light--------------------------------------------------
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1;
        


        


        BABYLON.SceneLoader.LoadAssetContainer("../models/", "sprig-wave.glb", scene, function (container) {
            var meshes = container.meshes;
            var materials = container.materials;

            const sprig = meshes[0]

            scene.beforeRender = () => {
                // sprig.position.y = 0;
                // sprig.rotation.y = .1;
                // sprig.rotationQuaternion = undefined;
                sprig.position = new BABYLON.Vector3(0, 0.5, 0);

                }
            // Adds all elements to the scene
            container.addAllToScene();
            //camera.setTarget(BABYLON.Vector3.Zero(sprig)); 
        });

        
        BABYLON.SceneLoader.LoadAssetContainer("../models/", "focus_room.glb", scene, function (container) {
          var meshes = container.meshes;
          var materials = container.materials;

          const room = meshes[0]


          scene.beforeRender = () => {
            room.scaling = new BABYLON.Vector3(-5, 4, 5);
            room.position = new BABYLON.Vector3(0, -2, 30);

              // room.rotation.y = 1.57;
              // room.rotationQuaternion = undefined;
              //room.rotation = new BABYLON.Vector3(0, 3.14, 0);

              }
          // Adds all elements to the scene
          container.addAllToScene();
      });
  }

    //Will run on every frame render.  We are spinning the box on y-axis.
    onRender = scene => {
        if (box !== undefined) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime();
        const rpm = 10;
        box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
        }
  }


}
export default withRouter(VirtualPet);