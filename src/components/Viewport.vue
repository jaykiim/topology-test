<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
	perRow: { type: Number, default: 5 }
});

const processedData = ref<any[][]>([]);

function processData(data: any[]) {
	for (let i = 0; i < data.length; i += props.perRow) {
		processedData.value.push(data.slice(i, i + props.perRow));
	}
}

onMounted(() => processData(props.data));
</script>

<template>
  <!-- header -->
  <div></div>
  
  <!-- viewport -->
  <div>
    <!-- host -->
    <!-- board -->
    <div class="board">
			<div class="row">
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
			</div>
			<div class="row">
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
			</div>
			<div class="row">
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
				<img src="../assets/images/Group 25.png" class="img"/>
			</div>
	  </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  position: absolute;
	content: '';
	transition: all .5s;
}

.board {
  display: inline-block; 
	padding: 20px 40px;
	color: white;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(30deg) skewX(-20deg) scaleY(-1);
	vertical-align: middle;
	font-family: 'Rubik One', sans-serif;
	text-decoration: none;
	font-size: 4vw;
	transition: all .5s;
	background-color: #3498db;

	&::before {
    @extend .test;
		bottom: 390px;
		height: 15px;
		width: 100%;
		left: 10px;
		transform: skewX(-55deg) scaleX(-1);
		background-color: darken(#3498db, 20%);
	}

	&::after {
		@extend .test;
		right: -15px;
		height: 100%;
		width: 20px;
		bottom: 10px;
		transform: skewY(-35deg) translateX(5px);
		background-color: darken(#3498db, 30%);
		z-index: 100000;
	}
}

.img {
	z-index: 100000;
	/* transform: rotate(-55deg) scaleY(-1); */
	width: 50px;
	height: 50px;
	margin: 10px;
}
</style>