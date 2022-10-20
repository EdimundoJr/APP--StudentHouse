import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base'

type Props = IButtonProps & {
  title: string;
}

export function Button({ title , ...rest } : Props){

  return(
    <ButtonNativeBase
    bg="#94B447"
    h={14}
    fontSize="sm"
    rounded="sm"
    _pressed={{bg: "#5d6e1e"}}
    {...rest}
    >
      <Heading color="white" fontSize="sm">{title}</Heading>
    </ButtonNativeBase>
  )

}