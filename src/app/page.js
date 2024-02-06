'use client'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export default function Home() {
  const videoRef = useRef()
  const pdfRef = useRef()
  const [start, setStart] = useState(0)
  const [pause, setPause] = useState(0)
  const [duration, setDuration] = useState(0)

  const [time, setTime] = useState(0)

  const [isRunning, setIsRunning] = useState(false)

  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    const allPageNumbers = [] // array of numbers
    for (let p = 1; p < numPages + 1; p++) {
      allPageNumbers.push(p)
    }
    setAllPageNumbers(allPageNumbers)

    // just for fun
    setOuterWidth(document.getElementById('pdf-container').offsetWidth)
  }

  let intervalId
  useEffect(() => {
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 0.75)
      // console.log(time)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, time])

  useEffect(() => {
    console.log('q')
  }, [pdfRef])

  const [allPageNumbers, setAllPageNumbers] = useState() // default value is undefined.
  const PAGE_MAX_HEIGHT = 600
  const [outerWidth, setOuterWidth] = useState()
  const CONTAINER_PADDING = 50

  const startAndStop = () => {
    setIsRunning(!isRunning)
  }
  return (
    <main>
      <div>
        <video
          width='320'
          height='240'
          // controls
          autoPlay
          playsInline
          preload='none'
          ref={videoRef}
          // onTimeUpdate={(e) => {
          //   console.log(e)
          // }}
          // onSeeked={(e) => {
          //   console.log(e)
          // }}
          onEnded={(e) => {
            console.log(e)
          }}
          onPlay={(e) => {
            console.log(e.currentTarget.currentTime)
            setStart(e.currentTarget.currentTime)
            startAndStop()
          }}
          onPause={(e) => {
            console.log(e.currentTarget.currentTime)
            console.log(e.currentTarget.duration)
            setPause(e.currentTarget.currentTime)
            setDuration(e.currentTarget.duration)
            startAndStop()
            console.log(time / 1000)
          }}
        >
          <source src='/2.mp4' type='video/mp4' />
        </video>
      </div>

      <button
        className='stopwatch-button'
        onClick={() => {
          videoRef.current.currentTime = { pause }
        }}
      >
        Go to {pause}
      </button>
      <button
        className='stopwatch-button'
        onClick={() => {
          videoRef.current.currentTime = 0
        }}
      >
        Reset
      </button>
      <button
        className='stopwatch-button'
        onClick={() => {
          videoRef.current.play()
        }}
      >
        Play
      </button>
      <button
        className='stopwatch-button'
        onClick={() => {
          videoRef.current.pause()
        }}
      >
        Pause
      </button>
      {/* <div>{((time * 1.7) / 1000 / duration) * 100}</div> */}
      <div>{}</div>
      <div>Play time {(time * 1.7) / 1000}</div>
      {/* <div
        id='pdf-container'
        style={{
          maxHeight: `${PAGE_MAX_HEIGHT}px`, // needed for scroll
          overflowY: 'scroll', // yes vertical scroll
          overflowX: 'hidden', // no horizontal scroll

          border: '2px solid lightgray',
          borderRadius: '5px',
        }}
        onScroll={(e) => {
          console.log(e.currentTarget.scrollTop)
          console.log(
            e.currentTarget.scrollHeight - e.currentTarget.offsetHeight + 4
          )
        }}
        ref={pdfRef}
      >
        <Document
          file='/คู่มือ Ally Sky Rewards.pdf'
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {allPageNumbers
            ? allPageNumbers.map((pn) => (
                <Page
                  key={`page-${pn}`}
                  width={outerWidth - CONTAINER_PADDING * 2}
                  pageNumber={pn}
                /> // 'width' is just for fun.
              ))
            : undefined}
        </Document>
      </div> */}
    </main>
  )
}
