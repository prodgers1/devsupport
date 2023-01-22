import { TextField, Grid } from '@mui/material';

export default function InputGrid ({ placeholderText } : InputGridParams) {
  return (
    <Grid item xs={12}>
      <TextField
        name="content"
        fullWidth
        id="content"
        multiline
        rows={15}
        placeholder={placeholderText}
      />
    </Grid>
  )
}

interface InputGridParams {
  placeholderText: string
}