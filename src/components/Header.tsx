import CallSplitIcon from '@mui/icons-material/CallSplit';
const Header = () => {
  return (
    <div className='border-b-2 bg-black text-white p-2' style={{ display: 'flex', fontFamily: 'Graphik Web,sans-serif', fontSize: "25px" }}>
      <CallSplitIcon sx={{ fontSize: 40, color: 'white' }} color="disabled" />
      <p>Recommender System</p>
      <div className='grid justify-items-end grow'><a href="https://machinelearningcoban.com/2017/05/24/collaborativefiltering/">Docs</a></div>
    </div >
  )
}

export default Header