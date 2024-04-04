<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import type { VMInfo, VMInfoWithSrc } from '@/types/test';

const props = defineProps({
  data: { type: Array as PropType<VMInfo[]>, required: true },
	perRow: { type: Number, default: 5 }
});

const processedData = ref<VMInfoWithSrc[][]>([]);

function processData(data: VMInfo[]) {
  const dataWithSrc = data.map(d => {
    return { 
      ...d, 
      src: new URL(`/src/assets/images/${d.container.length ? 1 : 0}_${d.creator}_${d.status}.png`, import.meta.url).href
    };
  });
	for (let i = 0; i < dataWithSrc.length; i += props.perRow) {
		processedData.value.push(dataWithSrc.slice(i, i + props.perRow));
	}
  console.log('processed data', processedData.value);
}

/* ========================================================================================================================================================================================================================================================================================
zoom, pan
================================================================================================================================================================================================================================================================================================================================================ */

const boardRef = ref<HTMLDivElement>();
const boardW = ref<number>(800);
const boardH = ref<number>(600);
const panX = ref<number>(0);
const panY = ref<number>(0);

const startDragX = ref<number>(0);
const startDragY = ref<number>(0);

const ZOOM_FACTOR = 0.05;
const scale = ref<number>(1); // 줌 배율

function handleWheel(e: WheelEvent) {
  // page lt를 기준으로 마우스 포인터가
  // l: r로 이동
  // lt: rb로 이동
  // lb: rt로 이동
  // --> x, y 모두 반대방향으로 이동한다
  // 얼만큼? x,y 각각 lt 지점과 마우스 포인터와의 거리만큼
  if (!boardRef.value) return;
  console.log('handleWheel')
  // 확대 배율 조정
  const prevScale = scale.value;
  const delta = e.deltaY
  if (delta > 0) zoomOut();
  else zoomIn();

  // .element-page ~ 마우스 포인터까지 거리
  const boardPos = boardRef.value.getBoundingClientRect();
  const x = (e.clientX - boardPos.x) / scale.value; 
  const y = (e.clientY - boardPos.y) / scale.value;
  
  const px = x / boardW.value;
  const py = y / boardH.value;
  const ds = scale.value - prevScale;
  const dw = boardW.value * ds;
  const dh = boardH.value * ds;
  panX.value -= px * dw;
  panY.value -= py * dh;
}

function zoomIn() {
  scale.value += ZOOM_FACTOR;
}

function zoomOut() {
  if (scale.value > 1) {
    scale.value -= ZOOM_FACTOR;
  }
}

function handleMouseDown(e: MouseEvent) {
  startDragX.value = e.clientX;
  startDragY.value = e.clientY;

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {  
  let deltaX = e.clientX - startDragX.value;
  let deltaY = e.clientY - startDragY.value;

  // 패닝
  panX.value += deltaX;
  panY.value += deltaY;
  startDragX.value = e.clientX;
  startDragY.value = e.clientY;
}

function handleMouseUp() {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
}

onMounted(() => processData(props.data));
</script>

<template>
  <div class="container">
    <div class="list"></div>
    
    <!-- 시각화 -->
    <div class="viewport-container">
      <!-- 헤더 -->
      <div class="header">
        <div class="title">
          <p class="hostname">host_oke201</p>
          <p class="value">101.255.0.1</p>
        </div>
        <div class="count">
          <div class="vm">
            <p class="label" style="color: #357bd6;">Contrabass VM</p>
            <p class="value">6</p>
          </div>
          <div class="vm">
            <p class="label">VM</p>
            <p class="value">2</p>
          </div>
        </div>
      </div>

      <!-- 뷰포트 -->
      <div class="viewport"
        @wheel="handleWheel" 
        @mousedown="handleMouseDown"
        :style="{backgroundImage: `repeating-linear-gradient(-30deg, #474a4d, #474a4d 2px, transparent 0, transparent ${22 * scale + 'px'}), repeating-linear-gradient(30deg, #474a4d, #474a4d 2px, transparent 0, transparent 0 ${22 * scale + 'px'})`}"
      >
        <div class="content-container" :style="{left: panX + 'px', top: panY + 'px', }">
          <div class="contents">
            <!-- 보드 -->
            <div class="board" ref="boardRef">
              <div class="row" v-for="(row, i) of processedData" :key="i">
                <!-- VM -->
                <div class="vm" v-for="vm of row" :key="vm.name">
                  <img :src="vm.src" class="img" :style="{ width: 50 * scale + 'px', height: 50 * scale + 'px', margin: 25 * scale + 'px' }"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  
  .list {
    width: 600px;
    border-right: 1px solid #ccc;
  }

  .viewport-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 20px 25px;
      background-color: #333;
      color: #fff;

      .title {
        display: flex;
        align-items: center;
        font-size: 14px;

        .hostname {
          font-weight: bold;
          margin-right: 20px;
        }
      }

      .count {
        display: flex;
        gap: 25px;

        .vm {
          display: flex;
          align-items: center;
          
          .label {
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }

      .value {
        color: #f0f0f0;
        font-size: 13px;
      }
    }

    .viewport {
      flex: 1;
      background-color: #4b4f52;
      background-image: repeating-linear-gradient(-30deg, #474a4d, #474a4d 2px, transparent 0, transparent 22px), repeating-linear-gradient(30deg, #474a4d, #474a4d 2px, transparent 0, transparent 0 22px);
      overflow: hidden;
      position: relative;

      .content-container {
        position: absolute;
        width: 100%;
        height: 100%;

        .board {
          display: inline-block; 
          padding: 20px 40px;
          min-width: 200px;
          min-height: 150px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(30deg) skewX(-30deg) scaleY(-1) scaleX(-1);
          vertical-align: middle;
          font-family: 'Rubik One', sans-serif;
          text-decoration: none;
          font-size: 4vw;
          transition: all .5s;
          background-color: #3c3c3c;

          .row {
            display: flex;
            align-items: center;
            /* justify-content: space-evenly; */

            .img {
              z-index: 100000;
              /* transform: rotate(-55deg) scaleY(-1); */
              user-select: none;
              width: 50px;
              height: 50px;
              margin: 25px;
              transform: skewX(30deg) rotate(150deg);
            }
          }


          &::before {
            @extend .test;
            bottom: 100%;
            height: 15px;
            width: 100%;
            left: -8px;
            transform: skewX(45deg);
            background-color: darken(#3c3c3c, 20%);
          }

          &::after {
            @extend .test;
            right: 100%;
            height: 100%;
            width: 15px;
            bottom: 8px;
            transform: skewY(45deg);
            background-color: darken(#3c3c3c, 30%);
          }
        }
      }
    }
  }
}

.test {
  position: absolute;
	content: '';
	transition: all .5s;
}
</style>