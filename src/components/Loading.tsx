import { Center, Spinner } from 'native-base'

export function Loading(){
  return(
    <Center flex={1} >
    <Spinner color="primary.700"></Spinner>
    </Center>
  )
}