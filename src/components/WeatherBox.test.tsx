import { render, screen } from '@testing-library/react'
import { WeatherBox } from './WeatherBox'
import { IWeather } from '../types'

describe('WeatherBox component', () => {
  let mockedWeather: IWeather
  const mockedLocation = 'Zilina, Slovakia'

  beforeEach(() => {
    mockedWeather = { temperature: '20°C', description: 'sunny' }
  })

  test('correctly renders to the DOM', () => {
    render(<WeatherBox location={mockedLocation} weather={mockedWeather!} />)
    const weatherComponent = screen.getByText(/Weather in Zilina, Slovakia/i)
    expect(weatherComponent).toBeInTheDocument()
  })
})
