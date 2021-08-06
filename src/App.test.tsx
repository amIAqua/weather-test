import { render, screen, fireEvent } from '@testing-library/react'
import { App } from './App'

test('renders the app', () => {
  render(<App />)
  const weatherComponent = screen.getByText('Reload weather')
  expect(weatherComponent).toBeInTheDocument()
})

test('search input renders correctly', () => {
  const { getByPlaceholderText } = render(<App />)
  const searchInput = getByPlaceholderText('City')
  expect(searchInput).toBeInTheDocument()
})

test('search input value changes correctly', () => {
  const { getByPlaceholderText } = render(<App />)
  const searchInput = getByPlaceholderText('City') as HTMLInputElement

  expect(searchInput.value).toBe('')
  fireEvent.change(searchInput, { target: { value: 'New-York' } })
  expect(searchInput.value).toBe('New-York')
})

test('search button renders correctly', () => {
  const { getByText } = render(<App />)
  const searchButton = getByText('Reload weather')
  expect(searchButton).toBeInTheDocument()
})
