import { Container, Paper, Typography, makeStyles } from '@material-ui/core'
import { IWeather } from '../types'

const useStyles = makeStyles({
  container: {
    marginTop: '1rem',
  },
  card: {
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '40px',
    color: '#5e75db',
  },
  temp: {
    marginTop: '1rem',
    fontSize: '30px',
  },
  description: {
    marginTop: '1rem',
    fontSize: '30px',
    color: '#f06770',
  },
})

type WeatherBoxPropsType = {
  location: string
  weather: IWeather
}

export const WeatherBox = ({
  location,
  weather,
}: WeatherBoxPropsType): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth='sm' className={classes.container}>
        <Paper elevation={3} className={classes.card}>
          <div>
            <Typography
              variant={'h4'}
              component={'h1'}
              className={classes.title}
            >
              Weather in {location}
            </Typography>
          </div>

          <div>
            <Typography
              variant={'h2'}
              component={'div'}
              className={classes.temp}
            >
              {weather?.temperature || '-'}°C
            </Typography>

            <Typography
              variant={'h3'}
              component={'div'}
              className={classes.description}
            >
              {weather?.description || '-'}
            </Typography>
          </div>
        </Paper>
      </Container>
    </>
  )
}
