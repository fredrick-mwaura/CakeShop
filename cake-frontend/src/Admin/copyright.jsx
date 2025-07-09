import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { positions } from '@mui/system';

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      align="center"

      {...props}
      sx={[
        {
          positions: 'bottom',
          color: 'text.secondary',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="http://127.0.0.1:5173/">
        made with love by @fredrickMwaura
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
