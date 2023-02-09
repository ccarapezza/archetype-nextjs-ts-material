import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MainInfoCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h5" component="h1" gutterBottom>MUI v5 + Next.js with TS Archetype</Typography>}
        subheader={<h4 className="text-red-500">(and Tailwind CSS)</h4>}
      />
      <CardMedia
        component="img"
        height="200"
        image="https://picsum.photos/500/300"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque hendrerit nulla lectus, vitae dapibus tortor tincidunt eget. Mauris posuere sem nec luctus hendrerit. Morbi volutpat nec metus sed molestie. Suspendisse laoreet et turpis at fringilla. Aliquam pellentesque a diam et iaculis. Aenean suscipit dui vel enim sodales pellentesque nec in orci. In pharetra ex ut ipsum interdum facilisis. Quisque id tempor odio. Curabitur eu commodo ex, at convallis lectus. Aliquam quis nisi sodales, vehicula quam suscipit, hendrerit massa. Vivamus ligula dui, dapibus at quam in, convallis ornare justo. Proin finibus lectus quam, nec vestibulum nulla volutpat vel. Sed vitae condimentum neque.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}