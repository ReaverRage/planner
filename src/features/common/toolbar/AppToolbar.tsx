import React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBack';
import ProfileIcon from './ProfileIcon';
import { useAuthContext } from '../../auth/auth-context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


interface AppToolbarProps {
  title: string;
  shouldShowProfile: boolean;
  // TODO: Maybe use context for viewing/planning modes
}

export default function AppToolbar(props: AppToolbarProps) {
  const { title, shouldShowProfile } = props;

  const classes = useStyles();

  const { user, signOut, switchAccounts } = useAuthContext();

  const [inDetail, setInDetail] = React.useState(false);


  const determineLeftButtonLabel = () => {
    if (inDetail) { // TODO: Determine based on viewing/planning context
      return 'Menu';
    }
    return 'Back';
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    switchAccounts('default');
  };

  const handleAccountSettingsClick = () => {
    // TODO: Navigate to account settings
  };

  const handleBackButtonClick = () => {
    setInDetail(false);
  };

  const leftButtonIcon = inDetail
    ? (
      <BackIcon onClick={handleBackButtonClick} />
    )
    : (
      <MenuIcon />
    );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label={determineLeftButtonLabel()}>
          {leftButtonIcon}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {shouldShowProfile &&
          <ProfileIcon
            userName={user.name}
            userImage={user.image}
            isSignedIn={user.id !== 'guest'}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            onAccountProfileClick={handleAccountSettingsClick}
          />
        }
      </Toolbar>
    </AppBar>
  );
}