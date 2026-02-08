import type { IdentifiedDistortion } from '../types';
import { getCloudPositions } from '../utils/cloudLayout';
import CloudBubble from './CloudBubble';

interface CloudFieldProps {
  distortions: IdentifiedDistortion[];
}

export default function CloudField({ distortions }: CloudFieldProps) {
  const positions = getCloudPositions(distortions.length);

  return (
    <div className="cloud-field">
      {distortions.map((d, i) => (
        <CloudBubble
          key={`${d.type}-${i}`}
          distortion={d}
          index={i}
          x={positions[i].x}
          y={positions[i].y}
          scale={positions[i].scale}
        />
      ))}
    </div>
  );
}
