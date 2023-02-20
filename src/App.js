import React, { useEffect, useState } from 'react'
import { Card, Input, Label, Row } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'

function App() {
  const [naveen, setNaveen] = useState(undefined)
  const [valid, setValid] = useState(false)
  const [result, setResult] = useState(undefined)
  const [lcmResult, setLcmResult] = useState(undefined)
  const [arrayValue, setArrayValue] = useState([])
  const [inputValue, setInputValue] = useState()
  const [bookingInput, setBookingInput] = useState({
    from: undefined,
    to: undefined,
    date: new Date(),
    answer: undefined,
  })

  useEffect(() => {
    if (valid) {
      nextPalindrome()
    }
  }, [valid, naveen])

  const inputHandler = (value) => {
    setNaveen(value)
    setValid(false)
  }

  const pushHandler = () => {
    let temp = [...arrayValue]
    if (inputValue > 0) {
      temp.push(inputValue)
    }
    setArrayValue(temp)
    setInputValue('')
  }

  function nextPalindrome() {
    let digits = []
    let m = parseInt(naveen) + 1
    while (m > 0) {
      digits.unshift(m % 10)
      m = Math.trunc(m / 10)
    }

    let carryFlag = false
    let midPoint = Math.floor(digits.length / 2)

    for (let i = 0; i < digits.length; i++) {
      let copyFrom = digits[i]
      let copyTo = digits[digits.length - 1 - i] + carryFlag
      if (copyTo === 10) {
        digits[digits.length - 1 - i] = 0
        carryFlag = true
      } else {
        let digit = i < midPoint ? copyFrom : copyTo
        carryFlag = copyTo > digit
        digits[i] = digits[digits.length - 1 - i] = digit
      }
    }

    setResult(digits.reduce((acc, next) => 10 * acc + next, 0))
  }

  function validatePalin(n) {
    const len = n.length
    for (let i = 0; i < len / 2; i++) {
      if (n[i] !== n[len - 1 - i]) {
        alert('It is not a palindrome')
        setValid(false)
        break
      } else {
        setValid(true)
        break
      }
    }
  }

  const calculateLCM = (arr) => {
    const gcd2 = (a, b) => {
      if (!b) return b === 0 ? a : NaN
      return gcd2(b, a % b)
    }
    const lcm2 = (a, b) => {
      return (a * b) / gcd2(a, b)
    }
    let n = 1
    for (let i = 0; i < arr.length; ++i) {
      n = lcm2(arr[i], n)
    }
    setLcmResult(n)
  }

  const bookTicket = () => {
    if (
      bookingInput?.from?.length > 1 &&
      bookingInput?.to?.length > 1 &&
      bookingInput?.date
    ) {
      let from = bookingInput?.from.substring(0, 2)
      let to = bookingInput?.to.slice(-2)
      let date = new Date(bookingInput?.date)
      let strDate = date.getDate()
      let strMonth = date.getMonth()
      let rstMonth = parseInt(strMonth) + 1
      let strYear = date.getFullYear()
      let yearStr = strYear.toString()
      let rstYear = yearStr.slice(-2)
      let result = from + to + strDate + rstMonth + rstYear
      setBookingInput({ ...bookingInput, answer: result })
    } else {
      debugger
      if (
        bookingInput?.from?.length <= 1 ||
        bookingInput?.from?.length == undefined
      ) {
        alert('please enter atleast 2 character on from field')
      }
      if (
        bookingInput?.to?.length <= 1 ||
        bookingInput?.to?.length == undefined
      ) {
        alert('please enter atleast 2 character on to field')
      }
      if (!bookingInput?.date) {
        alert('please select date')
      }
    }
  }

  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-md-2 "></div>

        <Card style={{ width: '100%', height: '400px' }}>
          <h2 className="text-center mt-5">Palindrome Finder</h2>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-5 mt-5">
                <Label>Enter the value:</Label>
              </div>
              <div className="col-md-7 mt-5">
                <Input
                  onChange={(e) => inputHandler(e.target.value)}
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div
                className="col-md-12 mt-5"
                style={{ textAlign: 'center', marginLeft: '10rem' }}
              >
                <button
                  disabled={!naveen?.length}
                  className="btn btn-primary btn-sm"
                  onClick={() => validatePalin(naveen)}
                >
                  {' '}
                  Check{' '}
                </button>
              </div>
            </div>
          </div>

          {valid && (
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5 mt-5">
                  <Label>Next palindrome number:</Label>
                </div>
                <div className="col-md-7 mt-5">{result}</div>
              </div>
            </div>
          )}
        </Card>
        <div className="col-md-2"></div>
      </div>
      <div className="row p-5">
        <div className="col-md-2 "></div>

        <Card style={{ width: '100%', height: '450px' }}>
          <h2 className="text-center mt-5">LCM Finder</h2>
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-5 mt-5">
                <Label>Enter the value:</Label>
              </div>
              <div className="col-md-5 mt-5">
                <Input
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  type="number"
                />
              </div>
              <div className="col-md-2 mt-5">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={pushHandler}
                >
                  Push
                </button>
              </div>
            </div>
            {arrayValue?.length > 0 && (
              <div className="row">
                <div className="col-md-6 mt-5">
                  <Label>Your inputs:</Label>
                </div>
                <div className="col-md-6 mt-5">
                  {'[' + arrayValue.toString() + ']'}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="row">
              <div
                className="col-md-12 mt-5"
                style={{ textAlign: 'center', marginLeft: '10rem' }}
              >
                <button
                  disabled={!arrayValue?.length}
                  className="btn btn-primary btn-sm"
                  onClick={() => calculateLCM(arrayValue)}
                >
                  {' '}
                  Check LCM{' '}
                </button>
              </div>
            </div>
          </div>

          {lcmResult && (
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-5 mt-5">
                  <Label>LCM Result:</Label>
                </div>
                <div className="col-md-7 mt-5">{lcmResult}</div>
              </div>
            </div>
          )}
        </Card>
        <div className="col-md-2"></div>
      </div>
      <div className="row p-5">
        <div className="col-md-2 mt-3 "></div>

        <Card style={{ width: '100%', height: '400px' }}>
          <h2 className="text-center mt-3">Ticket Booking</h2>
          <div className="mt-5">
            <Row>
              {' '}
              <div className="col-md-4">
                <label>From* :</label>{' '}
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  onChange={(e) =>
                    setBookingInput({ ...bookingInput, from: e.target.value })
                  }
                ></input>
              </div>
            </Row>
            <Row className="mt-2">
              <div className="col-md-4">
                <label>To* :</label>{' '}
              </div>
              <div className="col-md-8 ml-0">
                <input
                  type="text"
                  onChange={(e) =>
                    setBookingInput({ ...bookingInput, to: e.target.value })
                  }
                ></input>
              </div>
            </Row>

            <Row className="mt-2">
              <div className="col-md-4">
                <label>Date :</label>{' '}
              </div>
              <div className="col-md-8 ml-0">
                <DatePicker
                  dateFormat="dd-MM-y"
                  value={bookingInput?.date}
                  selected={new Date(bookingInput?.date)}
                  onChange={(e) =>
                    setBookingInput({ ...bookingInput, date: e })
                  }
                />
              </div>
            </Row>

            <Row className="text-center mt-2">
              <div className="col-md-8">
                <div className="row">
                  <div
                    className="col-md-12 mt-5"
                    style={{ textAlign: 'center', marginLeft: '6rem' }}
                  >
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={bookTicket}
                    >
                      {' '}
                      Book a Ticket{' '}
                    </button>
                  </div>
                </div>
              </div>
            </Row>

            {bookingInput?.answer && (
              <Row className="mt-2">
                <div className="col-md-4 mt-4">
                  <label> Your Ticket : </label>{' '}
                </div>
                <div className="col-md-8 mt-4">
                  <label> {bookingInput?.answer} </label>{' '}
                </div>
              </Row>
            )}
          </div>
        </Card>
        <div className="col-md-2"></div>
      </div>
    </div>
  )
}
export default App
