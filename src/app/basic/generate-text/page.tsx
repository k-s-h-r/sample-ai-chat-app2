'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"

export default function Page() {
  const [generation, setGeneration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const prompt = '空はなぜ青いの？'

  return (
    <div className="p-4">
      <Button
        type="button"
        onClick={async () => {
          setIsLoading(true);

          await fetch('/api/basic/generate-text', {
            method: 'POST',
            body: JSON.stringify({
              prompt: prompt,
            }),
          }).then(response => {
            response.json().then(json => {
              setGeneration(json.text);
              setIsLoading(false);
            });
          });
        }}
      >
        Generate（{prompt}）
      </Button>

      <div>
        {isLoading ? 'Loading...' : generation}
      </div>
    </div>
  );
}