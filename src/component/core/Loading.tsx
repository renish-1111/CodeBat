import Navbar from "./Navbar"
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div>
        <Navbar />
        <div className='h-screen w-full flex justify-center items-center'>
          <CircularProgress style={{ color: 'primary' }} size={100} className='' />
        </div>
      </div>
  )
}

export default Loading
