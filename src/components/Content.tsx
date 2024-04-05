import React, { CSSProperties, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, ButtonGroup, FormControl, MenuItem, Modal, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ClockLoader } from 'react-spinners';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const override: CSSProperties = {
  zIndex: '999',
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export const Content = () => {
  const tryit: string =
    `{
    "u0": {
      "i0": "5",
      "i1": "4",
      "i2": "-1",
      "i3": "2",
      "i4": "2"
    },
    "u1": {
      "i0": "5",
      "i1": "-1",
      "i2": "4",
      "i3": "2",
      "i4": "0"
    },
    "u2": {
      "i0": "2",
      "i1": "-1",
      "i2": "1",
      "i3": "3",
      "i4": "4"
    },
    "u3": {
      "i0": "0",
      "i1": "0",
      "i2": "-1",
      "i3": "4",
      "i4": "-1"
    },
    "u4": {
      "i0": "1",
      "i1": "-1",
      "i2": "-1",
      "i3": "4",
      "i4": "-1"
    },
    "u5": {
      "i0": "-1",
      "i1": "2",
      "i2": "1",
      "i3": "-1",
      "i4": "-1"
    },
    "u6": {
      "i0": "-1",
      "i1": "-1",
      "i2": "1",
      "i3": "4",
      "i4": "5"
    }
  }`
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    matrix: "",
    K: 2
  });
  const [err, setErorr] = useState<{ mess: string | unknown }>({ mess: "" });
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const arrayFromJSON = JSON.parse(formData.matrix);
      axios.post('https://api-recommendater.onrender.com/api/recommendation', {
        matrix: arrayFromJSON,
        K: formData.K
      })
        .then(res => {
          setLoading(false)
          const jsonData = res.data;
          if (jsonData.status == 500) {
            setErorr({ mess: jsonData.mess })
            setTimeout(() => {
              setErorr({ mess: null })
            }, 3000);
          }
          else {
            setData(jsonData);
            setOpen(true);
          }
        })
        .catch(error => {
          setLoading(false)
          console.error('Error:', error);
          if (typeof error === 'string') {
            setErorr({ mess: error });
          } else {
            setErorr({ mess: "Có lỗi xảy ra. Vui lòng thử lại sau." });
          }
          setTimeout(() => {
            setErorr({ mess: null });
          }, 3000);
        });
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      if (typeof error === 'string') {
        setErorr({ mess: error });
      } else {
        setErorr({ mess: "Invalid format." });
      }
      setTimeout(() => {
        setErorr({ mess: null });
      }, 3000);
    }
  }


  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText("https://api-recommendater.onrender.com/api/recommendation");
  }
  const handleCopyTextTryit = () => {
    navigator.clipboard.writeText(tryit);
  }
  return (
    <>
      {loading ?
        <ClockLoader
          color={'black'}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Result
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      {data && Object.keys(data).map((user) => (
                        <TableCell key={user} align="right">{user}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data && Object.keys(data[Object.keys(data)[0]]).map((item) => (
                      <TableRow key={item}>
                        <TableCell component="th" scope="row">{item}</TableCell>
                        {Object.keys(data).map((user) => (
                          <TableCell key={user} align="right">{data[user][item]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          </Box>
        </Modal>
      }
      <div className='pb-10 pt-10'>
        <Box style={{ display: 'flex', justifyContent: 'center' }}
          component="form"
          onSubmit={(e) => submit(e)}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '60ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-textarea"
            label="Enter Original Utility Matrix"
            placeholder='Example:{"u0": {"i0": "5","i1": "4", "i2": "-1","i3": "2", "i4": "2"}}'
            fullWidth
            color="secondary"
            multiline
            maxRows={10}
            name="matrix"
            value={formData.matrix}
            onChange={(e) => setFormData((prev) => ({
              K: prev.K,
              matrix: e.target.value
            }))}
          />
          <TextField
            id="outlined-number"
            label="K"
            name="k"
            style={{ width: '70px' }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 2,
            }}
            value={formData.K}
            onChange={(e) => setFormData((prev) => ({
              K: parseInt(e.target.value),
              matrix: prev.matrix
            }))}
          />
          <ButtonGroup variant="outlined" aria-label="Loading button group">
            <Button style={{ height: "56px", margin: "8px" }} type='submit'>Submit</Button>
          </ButtonGroup>
          <TextField
            style={{ width: "200px" }}
            id="outlined-textarea"
            label="Try it out"
            placeholder='Example:{"u0": {"i0": "5","i1": "4", "i2": "-1","i3": "2", "i4": "2"}}'
            color="secondary"
            multiline
            maxRows={10}
            name="matrix"
            disabled
            value={tryit}
          />
          <button type='button' style={{ right: "325px", top: "109px" }} className='absolute' onClick={handleCopyTextTryit}><ContentCopyIcon className='active:bg-slate-400 active:round focus:outline-none focus:ring focus:ring-violet-300' /></button>
        </Box>

      </div>
      {err.mess && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Alert style={{ width: '63%', display: 'flex', justifyContent: 'center' }} severity="error">{JSON.stringify(err.mess)}</Alert>
      </div>}




      <div style={{ backgroundColor: "rgba(73,204,144,.1)" }}>
        <div className='rounded-t-lg border-solid border-t-2 border-l-2 border-r-2 p-2' style={{ borderColor: "#49cc90" }}>
          <div className="grid grid-cols-12">
            <div style={{ backgroundColor: "#49cc90", borderColor: "#49cc90" }} className='col-span-1 justify-center items-center h-7 flex w-20 border-solid border-2 border-sky-500 rounded text-white'>POST</div>
            <div className=' font-semibold items-center flex col-span-6'>https://api-recommendater.onrender.com/api/recommendation</div>
            <div className='font-thin text-descriptionx items-center flex col-span-4'>Create a list of product recommendations for customers</div>
            <div className='grid justify-items-end grow col-span-1'><button onClick={handleCopyText}><ContentCopyIcon className='active:bg-slate-400 active:round focus:outline-none focus:ring focus:ring-violet-300' /></button></div>
          </div>
        </div>
        <div style={{ backgroundColor: "hsla(0,0%,100%,.8)", borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className=" border-l-2 border-r-2 border-b-2  border-solid flex items-center p-2 flex-wrap col-span-12 font-bold">Parameters</div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 pt-2 '>
          <div className='grid grid-cols-12 w-full border-b-2'>
            <div className='col-span-2'>Name</div>
            <div className='col-span-10'>Description</div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 pt-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='flex col-span-2'>
              <p>body</p>
              <p className='text-textBody ps-1 text-red-500'>* request</p>
            </div>
            <div className='col-span-10'>Create a list of product recommendations for customers</div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='flex col-span-2'>
              <p className='text-objectx text font-bold'>object</p>
            </div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='flex col-span-2'>
              <p className='text-bodyx italic text-slate-400'>(body)</p>
            </div>
            <div className='col-span-10'>
              <div className='flex gap-1'>
                <button className=' border-black px-1 font-bold text-exemplevaluex'>Examle value</button>
              </div>
            </div>
          </div>
        </div>
        <div className='ps-10 grid grid-cols-12 px-4 border-r-2 border-l-2' style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }}>
          <div className='col-span-2'></div>
          <div className='col-span-10 bg-black rounded '>
            <pre className='text-white ps-4 pb-2 pt-2 text-examplejson font-bold '>
              <span>{'{'}</span><br />
              <span className='p-2'>{'"matrix":{'}</span><br />
              <span className='p-6'>{'"u0": {'}</span><br />
              <span className='p-8 text-'>{' "i0":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "5",'}</span></span><br />
              <span className='p-8 text-'>{' "i1":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "4",'}</span></span><br />
              <span className='p-8 text-'>{' "i2":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "-1",'}</span></span><br />
              <span className='p-8 text-'>{' "i3":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "2",'}</span></span><br />
              <span className='p-8 text-'>{' "i4":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "2",'}</span></span><br />
              <span className='p-6'>{'},'}</span><br />
              <span className='p-2'>{'...'}</span><br />
              <span>{'},'}</span><br />
              <span className=''>{' "K":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "2"'}</span></span><br />
              <span>{'},'}</span>
            </pre>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='ps-10 grid grid-cols-12 px-4 border-r-2 border-l-2 pt-1'>
          <div className='col-span-2'></div>
          <div className='col-span-10 text-Parametercontent'>Parameter content type</div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='ps-10 grid grid-cols-12 px-4 border-r-2 border-l-2 pt-1'>
          <div className='col-span-2'></div>
          <div className='col-span-10'>
            <FormControl sx={{ m: 1, minWidth: 100 }} >
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  <em>application/json</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ backgroundColor: "hsla(0,0%,100%,.8)", borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className=" border-l-2 border-r-2 border-b-2  border-solid flex items-center p-2 flex-wrap col-span-12 font-bold">Responses</div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 pt-2 '>
          <div className='grid grid-cols-12 w-full border-b-2'>
            <div className='col-span-2'>code</div>
            <div className='col-span-10'>Description</div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 pt-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='flex col-span-2'>
              <p className='font-bold'>200</p>
            </div>
            <div className='col-span-10'>Create a list of product recommendations for customers</div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='flex col-span-2'>
            </div>
            <div className='col-span-10'>
              <p>successful operation</p>
            </div>
          </div>
        </div>
        <div style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }} className='flex items-center col-span-12 border-r-2 border-l-2 ps-10 px-10 pb-2 '>
          <div className='grid grid-cols-12 w-full'>
            <div className='col-span-2'>
            </div>
            <div className='col-span-10'>
              <div className='flex gap-1 text-valuemodel'>
                <button className='border-black px-1 font-bold text-valuemodel'>Examle value</button>
              </div>
            </div>
          </div>
        </div>
        <div className='ps-10 grid grid-cols-12 px-4 border-r-2 border-l-2' style={{ borderRightColor: "#49cc90", borderLeftColor: '#49cc90' }}>
          <div className='col-span-2'></div>
          <div className='col-span-10 bg-black rounded '>
            <pre className='text-white ps-4 pb-2 pt-2 text-examplejson font-bold '>
              <span>{'{'}</span><br />
              <span className='p-2'>{'"u0": {'}</span><br />
              <span className='p-4 text-'>{' "i0":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "5",'}</span></span><br />
              <span className='p-4 text-'>{' "i1":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "4",'}</span></span><br />
              <span className='p-4 text-'>{' "i2":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "4.16",'}</span></span><br />
              <span className='p-4 text-'>{' "i3":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "2",'}</span></span><br />
              <span className='p-4 text-'>{' "i4":'}<span style={{ color: "rgb(162, 252, 162)" }}>{' "2",'}</span></span><br />
              <span className='p-2'>{'},'}</span><br />
              <span className='p-2'>{'...'}</span><br />
              <span>{'}'}</span><br />
            </pre>
          </div>
        </div>
        <div style={{ borderColor: "#49cc90" }} className='ps-10 grid grid-cols-12 px-4 border-r-2 border-l-2 pt-1 rounded-b-lg border-b-2 pb-2'>
          <div className='col-span-2'>
            <p className='font-bold'>500</p>
          </div>
          <div className='col-span-10'>Invalid</div>
        </div>
      </div>
    </>

  )
}
