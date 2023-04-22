import { Typography } from '@mui/material';


let Error404 = () => {
  return (
    <div>
      <Typography align="center" variant="h1">
        404: The page you are looking for isn’t here
      </Typography>
      <Typography align="center" variant="subtitle2">
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <img alt="Under development" src="/images/errors/404.svg" />
    </div>
  );
};

export default Error404;