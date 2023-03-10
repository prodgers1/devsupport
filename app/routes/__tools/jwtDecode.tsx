import React from 'react';
import { Grid, Button } from '@mui/material';
import type { ActionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { badRequest } from '~/utils/request.server';
import jwtDecode from "jwt-decode"
import InputGrid from '~/src/components/InputGrid';
import OutputGrid from '~/src/components/OutputGrid';

export const action = async ({ request }: ActionArgs) => {
  const queryString = await request.text();
  const searchParams = new URLSearchParams(queryString);
  const body: any = {};
  const entries = Array.from(searchParams.entries());
  entries.forEach(([key, value]) => {
    body[key] = value;
  });

  const str = body['content'];

  let decoded = ""
  try {
    decoded = jwtDecode(str)
  }
  catch (ex) {
    console.error(ex)
    return badRequest("Error decoding JWT")
  }

  return JSON.stringify(decoded, null, 2);
};

export default function JwtDecode() {
  const actionData = useActionData<typeof action>();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form method="post">
            <Grid container spacing={2}>
              <InputGrid placeholderText="Enter JWT to decode" />

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" name="format" type="submit" value="decode">
                      Decode
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Grid>
        {actionData != undefined && (
          <OutputGrid actionData={actionData} />
        )}
      </Grid>
    </React.Fragment>
  );
}

export function ErrorBoundary() {
  return <div className="error-container">Something unexpected went wrong. Sorry about that.</div>;
}
