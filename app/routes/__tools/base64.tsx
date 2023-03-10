import React from 'react';
import { Grid, Button } from '@mui/material';
import type { ActionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { badRequest } from '~/utils/request.server';
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

  if (!('content' in body) || !('type' in body)) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const str = body['content'];
  const buttonPressed = body['type'];

  let result = '';
  if (buttonPressed.toLowerCase() === 'encode') {
    let encodeBuffer = Buffer.from(str);
    result = encodeBuffer.toString('base64');
  } else if (buttonPressed.toLowerCase() === 'decode') {
    let decodeBuffer = Buffer.from(str, 'base64');
    result = decodeBuffer.toString('ascii');
  }

  return result;
};

export default function Base64() {
  const actionData = useActionData<typeof action>();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form method="post">
            <Grid container spacing={2}>
              <InputGrid placeholderText="Enter string to base 64 encode or decode" />

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" name="type" type="submit" value="encode">
                      Encode
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" name="type" type="submit" value="decode">
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
