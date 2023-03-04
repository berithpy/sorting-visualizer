import React, { useState, useEffect, useContext } from 'react';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import uniq from 'lodash/uniq';
import Bars from './components/bars';
import './App.css';
import context from './context';
import Oscillator from './components/oscillator';
import { ListFormat } from 'typescript';

function App() {


  const [listLength, setListLength] = useState(50)
  const [sortSpeed, setSortSpeed] = useState(0.1)
  const [list, setList] = useState<number[]>(shuffle(range(1, listLength)))
  const [playing, setPlaying] = useState(0)
  const [playingFrequency, setPlayingFrequency] = useState(0)
  const [algorithm, setAlgorithm] = useState('bubbleSort')
  const [disableActions, setDisableActions] = useState(false)

  function playOnclick() {
    play(0)
  }

  function playSingle(element: number) {
    setPlaying(element)
    let frequency = 2000 / listLength * element
    setPlayingFrequency(frequency)
    setTimeout(() => {
      setPlayingFrequency(0)
    }, sortSpeed)
  }

  function play(index: number) {
    if (index === list.length) {
      setPlayingFrequency(0)
      return;
    }
    const element = list[index];
    setPlaying(element)
    let frequency = 2000 / listLength * element
    setPlayingFrequency(frequency)
    setTimeout(() => {
      play(index + 1)
    }, sortSpeed)
  }

  const handleSorting = () => {
    setDisableActions(true)
    switch (algorithm) {
      case 'bubbleSort':
        bubbleSort()
        break
      case 'selectionSort':
        selectionSort()
        break
      case 'insertionSort':
        insertionSort()
        break
      case 'mergeSort':
        mergeSort()
        break
      case 'quickSort':
        quickSort()
        break
      case 'heapSort':
        heapSort()
        break
      default:
        break
    }
  }
  const bubbleSort = async () => {
    let currentArr = list
    let sorted = false

    while (!sorted) {
      sorted = true

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = 0; j < currentArr.length - i - 1; j++) {
          if (currentArr[j] > currentArr[j + 1]) {
            let temp = currentArr[j]
            currentArr[j] = currentArr[j + 1]
            currentArr[j + 1] = temp
            let tempList = [...currentArr]
            setList(tempList)
            playSingle(temp)

            await sleep(sortSpeed)

            sorted = false
          }
        }

      }
      if (sorted) finishedAnimation()
    }
  }

  // Selection Sort
  const selectionSort = async () => {
    let currentArr = list
    let sorted = false

    while (!sorted) {
      sorted = true

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = i + 1; j < currentArr.length; j++) {
          if (currentArr[i] > currentArr[j]) {
            let swap1 = currentArr[i]
            let swap2 = currentArr[j]
            currentArr[i] = swap2
            currentArr[j] = swap1
            setList([...currentArr])
            playSingle(swap1)
            playSingle(swap2)

            await sleep(sortSpeed)

            sorted = false
          }
        }
      }
      if (sorted) finishedAnimation()
    }
  }

  // Insertion Sort
  const insertionSort = async () => {
    let currentArr = list
    let sorted = false

    while (!sorted) {
      sorted = true

      for (let i = 1; i < currentArr.length; i++) {
        let current = currentArr[i]
        let j = i - 1
        while (j >= 0 && currentArr[j] > current) {
          currentArr[j + 1] = currentArr[j]
          setList([...currentArr])

          playSingle(currentArr[j])
          await sleep(sortSpeed)

          j--
          sorted = false
        }
        currentArr[j + 1] = current
        setList([...currentArr])
        playSingle(current)

      }
      if (sorted) finishedAnimation()
    }
  }

  // Merge Sort

  const mergeSort = async () => {
    let currentArr = list

    await sort(currentArr, 0, currentArr.length - 1)
    finishedAnimation()
  }

  const sort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      let mid = Math.floor((low + high) / 2)
      await sort(arr, low, mid)
      await sort(arr, mid + 1, high)
      await merge(arr, low, mid, high)
    }
  }

  const merge = async (arr: number[], low: number, mid: number, high: number) => {
    let i = low
    let j = mid + 1
    let k = 0
    let tempArr = []

    while (i <= mid && j <= high) {
      if (arr[i] < arr[j]) {
        tempArr[k] = arr[i]
        i++
        k++
      } else {
        tempArr[k] = arr[j]
        j++
        k++
      }
      setList([...list])

      playSingle(arr[i])
      // playSingle(arr[j])

      await sleep(sortSpeed)
    }

    while (i <= mid) {
      tempArr[k] = arr[i]

      setList([...list])


      playSingle(arr[i])

      await sleep(sortSpeed)

      i++
      k++
    }

    while (j <= high) {
      tempArr[k] = arr[j]

      setList([...list])

      playSingle(arr[j])
      await sleep(sortSpeed)
      j++
      k++
    }

    for (let i = low; i <= high; i++) {
      arr[i] = tempArr[i - low]
      setList([...list])
      playSingle(arr[i])
      await sleep(sortSpeed)
    }
  }

  // Quick Sort
  const quickSort = async () => {
    let currentArr = list

    await sorts(currentArr, 0, currentArr.length - 1)
    finishedAnimation()
  }

  const sorts = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      let partitionIndex = await partition(arr, left, right)

      setList([...list])
      await sleep(sortSpeed)
      // playfanfare() fanfare?
      await sorts(arr, left, partitionIndex - 1)
      await sorts(arr, partitionIndex + 1, right)
    }
  }

  const partition = async (arr: number[], left: number, right: number) => {
    let pivot = arr[right]
    let i = left - 1
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

        setList([...list])

        playSingle(temp)
        await sleep(sortSpeed)
      }
    }

    let temp = arr[i + 1]
    arr[i + 1] = arr[right]
    arr[right] = temp
    playSingle(temp)
    await sleep(sortSpeed)
    return i + 1
  }

  // Heap Sort
  const heapSort = async () => {
    let arr = list
    let length = arr.length
    let index = Math.floor(length / 2 - 1)
    let lastChild = length - 1

    while (index >= 0) {
      await heapify(arr, length, index)
      index--

      setList([...list])

      if (index >= 0) {
        // Color was done here
        await sleep(sortSpeed)

      } else {
        await sleep(sortSpeed)
      }
    }

    while (lastChild >= 0) {
      let swap1 = arr[0]
      let swap2 = arr[lastChild]

      arr[0] = swap2
      arr[lastChild] = swap1
      await heapify(arr, lastChild, 0)
      lastChild--

      setList([...list])

      if (index >= 0) {
        //Color was done here?
      } else {
        await sleep(sortSpeed)
      }
    }

    finishedAnimation()
  }

  const heapify = async (arr: number[], length: number, index: number) => {
    let largest = index
    let leftNode = index * 2 + 1
    let rightNode = leftNode + 1

    if (arr[leftNode] > arr[largest] && leftNode < length) {
      largest = leftNode
    }

    if (arr[rightNode] > arr[largest] && rightNode < length) {
      largest = rightNode
    }

    if (largest !== index) {
      let swap1 = arr[index]
      let swap2 = arr[largest]
      arr[index] = swap2
      arr[largest] = swap1

      playSingle(swap1)
      // playSingle(swap2)

      await sleep(sortSpeed)

      await heapify(arr, length, largest)
    }

    return arr
  }

  const finishedAnimation = async () => {
    play(0)
    setDisableActions(false)
  }

  function generate() {
    setList(shuffle(range(1, listLength)))
  }

  function sleep(milliSeconds: number) {
    return new Promise((resolve: any) => setTimeout(resolve, milliSeconds))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Bars numbers={list} playing={playing}></Bars>
        <Oscillator frequency={playingFrequency} />
        <div style={{ "display": "flex" }}>
          <select name="sortingalgos" id="algos" onChange={(e) => { setAlgorithm(e.target.value) }}>
            <option value="bubbleSort">bubblesort</option>
            <option value="selectionSort">selectionSort</option>
            <option value="insertionSort">insertionSort</option>
            <option value="mergeSort">mergeSort</option>
            <option value="quickSort">quickSort</option>
            <option value="heapSort">heapsort</option>
          </select>
          <button onClick={handleSorting} disabled={disableActions}>sort</button>
          <button onClick={generate} disabled={disableActions}>generate</button>
          <button onClick={playOnclick} disabled={disableActions}>play</button>
        </div>
      </header>
    </div>
  );
}

export default App;
