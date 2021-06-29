import { useHistory } from 'react-router';
import { Text } from '@chakra-ui/layout';
import { useEffect } from 'react';

export default function OAuth({ setToken }) {
  let history = useHistory();

  useEffect(async () => {
    const accessToken = window.location.hash.split('#access_token=')[1];
    await setToken(accessToken);
    console.log(accessToken);
    history.push('/');
  }, []);

  return <Text>Redirect...</Text>;
}
