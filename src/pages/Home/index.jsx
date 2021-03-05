import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Page from '../../components/Page';

export default function index() {
  // Array de boas vindas
  const welcomes = ['Bem vindo', 'O que você pode fazer hoje?', 'Como está se sentindo hoje?', 'Um dia após o outro', 'Quais são seus objetivos?'];
  const [welcome, setWelcome] = useState([welcomes]); // estado do array de boas vindas

  useEffect(() => {
    const w = Math.floor(Math.random() * 5); // n[umero aleatorio para o array
    setWelcome(welcomes[w]);
  }, []);

  return (
    <Page title={welcome}>
      <div className="m-2">
        <Button href="./Todo" size="lg" variant="primary" block>Começar</Button>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_fi8yfbmc.json" background="transparent" speed="1" style={{ width: '300px', height: '300px' }} loop controls autoplay />
      </div>
    </Page>
  );
}
