import { Image } from "@mantine/core";

export default function Logo(data: { small?: boolean, size?: string }) {
    let { small = false, size = '8rem' } = data;
    return (
        <Image src={`/images/logo${small ? '-small.png' : '.svg'}`} width={size} fit={'contain'} />
    );
}