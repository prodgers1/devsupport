import { TextField, Grid } from '@mui/material';

export default function OutputGrid({ actionData } : OutputGridParams) {
  return (
    <Grid item xs={12}>
      <TextField fullWidth id="content-result" multiline rows={15} value={actionData} />
    </Grid>
  )
}

interface OutputGridParams {
  actionData: any
}