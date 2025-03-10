/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
 import * as tf from '@tensorflow/tfjs-core';
 import * as posedetection from '@tensorflow-models/pose-detection';

// #ffffff - White
// #800000 - Maroon
// #469990 - Malachite
// #e6194b - Crimson
// #42d4f4 - Picton Blue
// #fabed4 - Cupid
// #aaffc3 - Mint Green
// #9a6324 - Kumera
// #000075 - Navy Blue
// #f58231 - Jaffa
// #4363d8 - Royal Blue
// #ffd8b1 - Caramel
// #dcbeff - Mauve
// #808000 - Olive
// #ffe119 - Candlelight
// #911eb4 - Seance
// #bfef45 - Inchworm
// #f032e6 - Razzle Dazzle Rose
// #3cb44b - Chateau Green
// #a9a9a9 - Silver Chalice
const COLOR_PALETTE = [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
  ];

const DEFAULT_LINE_WIDTH = 2;
const DEFAULT_RADIUS = 4;
const scoreThreshold = 0.3;

 export function isiOS() {
   return /iPhone|iPad|iPod/i.test(navigator.userAgent);
 }

 export function isAndroid() {
   return /Android/i.test(navigator.userAgent);
 }

 export function isMobile() {
   return isAndroid() || isiOS();
 }

 export function drawKeypoints(keypoints, ctx) {
     if(keypoints==null){
        // console.log('Not running');
        return;
     }
    //  console.log('running');
    const keypointInd = posedetection.util.getKeypointIndexBySide('MoveNet')
        // posedetection.util.getKeypointIndexBySide(params.STATE.model);
    ctx.fillStyle = 'Red';
    ctx.strokeStyle = 'White';
    ctx.lineWidth = DEFAULT_LINE_WIDTH;

    for (const i of keypointInd.middle) {
      drawKeypoint(keypoints[i], ctx);
    }

    ctx.fillStyle = 'Green';
    for (const i of keypointInd.left) {
      drawKeypoint(keypoints[i], ctx);
    }

    ctx.fillStyle = 'Orange';
    for (const i of keypointInd.right) {
      drawKeypoint(keypoints[i], ctx);
    }
  }

  export function drawKeypoint(keypoint, ctx){
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    // posedetection.sc
    // const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

    if (score >= scoreThreshold) {
      const circle = new Path2D;
      circle.arc(keypoint.x, keypoint.y, DEFAULT_RADIUS, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.stroke(circle);
    }
  }


  export function drawSkeleton(keypoints, ctx) {
    // Each poseId is mapped to a color in the color palette.

    // const color = params.STATE.modelConfig.enableTracking && poseId != null ?
    //     COLOR_PALETTE[poseId % 20] :
    //     'White';
    const color = COLOR_PALETTE[3];
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = DEFAULT_LINE_WIDTH;

    posedetection.util.getAdjacentPairs('MoveNet').forEach(([ i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      // If score is null, just show the keypoint.
      const score1 = kp1.score != null ? kp1.score : 1;
      const score2 = kp2.score != null ? kp2.score : 1;
    //   const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;


      if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  }
