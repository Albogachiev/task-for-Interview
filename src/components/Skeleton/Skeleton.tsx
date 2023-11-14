import React from "react"

import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
  <ContentLoader 
    speed={8}
    width={360}
    height={382}
    viewBox="0 0 330 342"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="53" y="49" rx="0" ry="0" width="170" height="231" /> 
    <rect x="31" y="292" rx="0" ry="0" width="178" height="8" /> 
    <rect x="177" y="318" rx="0" ry="0" width="0" height="18" /> 
    <rect x="29" y="312" rx="0" ry="0" width="185" height="9" />
  </ContentLoader>
)

export default Skeleton