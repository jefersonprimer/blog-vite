# Boas Práticas em JavaScript Vanilla

Escrever código JavaScript limpo e manutenível sem frameworks requer disciplina e boas práticas. Este post explora princípios importantes para o desenvolvimento com JavaScript vanilla.

## Mantenha Funções Pequenas e Focadas

Cada função deve fazer apenas uma coisa e fazê-la bem. Isso torna seu código mais legível, testável e reutilizável.

```javascript
// Ruim
function processarDadosUsuario(usuario) {
  // Validar usuário
  if (!usuario.nome) throw new Error('Nome é obrigatório');
  if (!usuario.email) throw new Error('Email é obrigatório');
  
  // Formatar dados do usuário
  usuario.nome = usuario.nome.trim();
  usuario.email = usuario.email.toLowerCase();
  
  // Salvar usuário no armazenamento
  localStorage.setItem('usuario', JSON.stringify(usuario));
  
  return usuario;
}

// Bom
function validarUsuario(usuario) {
  if (!usuario.nome) throw new Error('Nome é obrigatório');
  if (!usuario.email) throw new Error('Email é obrigatório');
  return usuario;
}

function formatarDadosUsuario(usuario) {
  return {
    ...usuario,
    nome: usuario.nome.trim(),
    email: usuario.email.toLowerCase()
  };
}

function salvarUsuario(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
  return usuario;
}

function processarDadosUsuario(usuario) {
  return salvarUsuario(formatarDadosUsuario(validarUsuario(usuario)));
}
