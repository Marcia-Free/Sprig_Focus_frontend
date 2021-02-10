import React from 'react'
import ReactDOM from 'react-dom'
import './Theme.css';

import'@babylonjs/loaders/glTF'
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import SceneComponent from './SceneComponent';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';

let container;
let box;



class VirtualPet extends React.Component {


    
render() {

    return (
        
        <div className='VirtualPet' >
            <SceneComponent antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='my-canvas' />
        </div>
    );
  }


    onSceneReady = scene => {
        // This creates and positions a free camera (non-mesh)
        var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'ground' shape.
        MeshBuilder.CreateGround("ground", {width: 25, height: 6}, scene);




        BABYLON.SceneLoader.LoadAssetContainer("../models/", "sprig-wave.glb", scene, function (container) {
            var meshes = container.meshes;
            var materials = container.materials;

            const sprig = meshes[0]

            scene.beforeRender = () => {
                // sprig.position.y = 0;
                sprig.rotation.y = .1;
                sprig.rotationQuaternion = undefined;

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
export default VirtualPet;