import React from 'react';
import Link from 'next/link';

function HashTagLayout({ children }) {
  return (
    <div className="detail">
      <header>
        <div className='inner'>
          <Link href="/"><button type="button" className="btn__back">뒤로가기</button></Link>
          <strong>목록으로</strong>
        </div>
      </header>
      {children}
    </div>
  );
}

export default HashTagLayout;
