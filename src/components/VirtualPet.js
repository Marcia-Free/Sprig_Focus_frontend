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

    
        // This creates and positions a free camera (non-mesh)
        var camera = new ArcRotateCamera("camera1", 0, 0, 10, new Vector3(0, 3, 1), scene);
            camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        // This targets the camera to scene origin
        // camera.setTarget(Vector3.Zero());
          // camera.useFramingBehavior = true;
          // The goal distance of camera from target
          camera.radius = 15;
          // The goal height of camera above local origin (centre) of target
          // camera.heightOffset = 5;  
          // The goal rotation of camera around local origin (centre) of target in x y plane
          // camera.rotationOffset = 0;
          // The speed at which acceleration is halted
          camera.maxCameraSpeed = .5;


        const canvas = scene.getEngine().getRenderingCanvas();
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        scene.activeCamera.panningSensibility = 0;
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;




        BABYLON.SceneLoader.LoadAssetContainer("../models/", "sprig-wave.glb", scene, function (container) {
            var meshes = container.meshes;
            var materials = container.materials;

            const sprig = meshes[0]

            scene.beforeRender = () => {
                // sprig.position.y = 0;
                // sprig.rotation.y = .1;
                // sprig.rotationQuaternion = undefined;

                }
            // Adds all elements to the scene
            container.addAllToScene();
        });

        
        BABYLON.SceneLoader.LoadAssetContainer("../models/", "room-nocolor.glb", scene, function (container) {
          var meshes = container.meshes;
          var materials = container.materials;

          const room = meshes[0]

          scene.beforeRender = () => {
            room.scaling = new BABYLON.Vector3(6, 4, 6);
              room.position.y = -4;
              // room.rotation.y = 1.57;
              room.rotationQuaternion = undefined;

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