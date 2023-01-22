import React from 'react';
import { Grid, Button } from '@mui/material';
import type { ActionArgs} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { badRequest } from '~/utils/request.server';
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from "@ethersproject/strings";
import OutputGrid from '~/src/components/OutputGrid';
import InputGrid from '~/src/components/InputGrid';

export const action = async ({ request }: ActionArgs) => {
  const queryString = await request.text();
  const searchParams = new URLSearchParams(queryString);
  const body: any = {};
  const entries = Array.from(searchParams.entries());
  entries.forEach(([key, value]) => {
    body[key] = value;
  });

  const str = body['content'];
  let keccak256Hash = ""

  try {
    keccak256Hash = keccak256(toUtf8Bytes(str))
  }
  catch (ex) {
    console.error(ex)
    return badRequest("Error converting input to keccak256 hash")
  }

  return keccak256Hash.substring(2) // don't output 0x prefix
};

export default function Keccak256() {
  const actionData = useActionData<typeof action>();

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form method="post">
            <Grid container spacing={2}>
              <InputGrid placeholderText="Enter text to hash" />

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" name="hash" type="submit" value="hash">
                      Hash
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
