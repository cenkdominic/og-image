import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';




export const config = {
  runtime: 'experimental-edge',
};

const font1 = fetch(new URL('../../assets/inter-v8-latin-700.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);


const font2 = fetch(new URL('../../assets/inter-v8-latin-600.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);


export default async function handler(req: NextRequest) {
	const fontData1 = await font1;
	const fontData2 = await font2;
  try {
	const { searchParams } = new URL(req.url);
	const title = decodeURI(req.nextUrl.pathname.substring(1).slice(0, -4));
	  
	const hasAuthor = searchParams.has('author');
	const author = hasAuthor
	  ? searchParams.get('author')?.slice(0, 100)
	  : ' ';


	return new ImageResponse(
	  (
		<div
		  style={{
			display: 'flex',
			height: '100%',
			width: '100%',
			alignItems: 'flex-start',
			justifyContent: 'center',
			flexDirection: 'column',
			backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #FEF3E4)',
			fontSize: 60,
			letterSpacing: -2,
			fontWeight: 700,
			fontFamily: '"Inter"',

		  }}
		>
		  <div
			style={{
			  display: 'flex',
			  padding: '5px 40px',
			  width: 'auto',
			  textAlign: 'left',
			  backgroundImage: 'linear-gradient(90deg, rgb(0, 11, 128), rgb(0, 223, 216))',
			  backgroundClip: 'text',
			  '-webkit-background-clip': 'text',
			  color: 'transparent',
			}}
		  >
			{title}
		  </div>
		  <div
			style={{
				fontFamily: '"Inter2"',
			  padding: '5px 40px',
			  width: 'auto',
			  textAlign: 'left',
			  backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
			  backgroundClip: 'text',
			  '-webkit-background-clip': 'text',
			  color: 'transparent',
			}}
		  >
			{author}
		  </div>
		  <div
			style={{
			  display: 'flex',
			  position: 'absolute',
			  right: 42,
			  bottom: 28,
			  height: '34px',
			  width: '100px',
			}}
		  >
			<img style={{
			width: '100%',
			height: '100%',
			}}  src="https://og.oa.mg/oamg.svg" />
		  </div>
		  
		 
		</div>

	  ),
	  {
		width: 1200,
		height: 630,
		fonts: [
			{
			  name: 'Inter',
			  data: fontData1,
			  style: 'normal',
			},
			{
			  name: 'Inter2',
			  data: fontData2,
			  style: 'normal',
			},
		  ],
	  },
	);
  } catch (e: any) {
	console.log(`${e.message}`);
	return new Response(`Failed to generate the image`, {
	  status: 500,
	});
  }
}
