import { ChangeEvent, KeyboardEvent, useState } from 'react'
import axios from 'axios'
import { Button, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Loader } from './components/Loader/Loader'

import { WeatherBox } from './components/WeatherBox'
import { IWeather, Units } from './types'

import './App.css'

const useStyles = makeStyles({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '5rem',
    marginTop: '2rem',
  },
  searchInput: {
    marginRight: '1rem',
    width: '300px',
  },
  searchButton: {
    backgroundColor: 'blue',
    color: '#fff',

    '&:hover': {
      backgroundColor: 'red',
    },
  },
})

export const App = () => {
  const [cityQuery, setCityQuery] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [results, setResults] = useState<IWeather | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const classes = useStyles()

  const onFetchWeather = async (): Promise<void> => {
    setResults(null)
    setLoading((prevStatus) => !prevStatus)

    try {
      const result = await axios.get(
        'http://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            appId: process.env.REACT_APP_API_KEY,
            q: cityQuery,
            units: Units.METRIC,
          },
        }
      )

      setResults({
        temperature: Math.round(result.data.main.temp),
        description: result.data.weather[0].description,
      })
      setLocation(`${result.data.name}, ${result.data.sys.country}`)
    } catch (error) {
      setLoading((prevStatus) => !prevStatus)
      throw error
    }

    setCityQuery('')
    setLoading((prevStatus) => !prevStatus)
  }

  const changeCityQuery = (event: ChangeEvent<HTMLInputElement>) =>
    setCityQuery((prev) => event.target.value)

  // start weather fething on press Enter
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) =>
    event.code === 'Enter' && cityQuery ? onFetchWeather() : null

  return (
    <div className='App'>
      <div className={classes.searchContainer}>
        <Input
          className={classes.searchInput}
          onChange={changeCityQuery}
          onKeyPress={onKeyPressHandler}
          placeholder={'City'}
          value={cityQuery}
        />
        <Button
          onClick={onFetchWeather}
          variant={'contained'}
          className={classes.searchButton}
          disabled={!cityQuery}
        >
          Reload weather
        </Button>
      </div>

      {loading && <Loader />}
      {results && <WeatherBox location={location} weather={results} />}
      {!results && !loading && <h2>No results :(</h2>}
    </div>
  )
}
