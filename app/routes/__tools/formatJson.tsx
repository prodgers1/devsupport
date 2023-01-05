import React from 'react';
import { TextField, Grid, Button } from '@mui/material';
import type { ActionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { badRequest } from '~/utils/request.server';

export const action = async ({ request }: ActionArgs) => {
  const queryString = await request.text();
  const searchParams = new URLSearchParams(queryString);
  const body: any = {};
  const entries = Array.from(searchParams.entries());
  entries.forEach(([key, value]) => {
    body[key] = value;
  });

  const str = body['content'];

  try {
    JSON.parse(str)
  }
  catch (ex) {
    return badRequest("String was not in proper JSON format")
  }

  return JSON.stringify(JSON.parse(str), null, 2);
};

export default function FormatJson() {
  const actionData = useActionData<typeof action>();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form method="post">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  fullWidth
                  id="content"
                  multiline
                  rows={10}
                  placeholder="Enter a JSON string"
                />
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" name="format" type="submit" value="format">
                      Format
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Grid>
        {actionData != undefined && (
          <Grid item xs={12}>
            <TextField fullWidth id="content-result" multiline rows={10} value={actionData} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">Something unexpected went wrong. Sorry about that.</div>;
}
