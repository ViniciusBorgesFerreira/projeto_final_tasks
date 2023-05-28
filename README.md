# projeto_final_tasks

Projeto backend node para uma aplicação de tarefas:

Tema: Gerenciamento de Tarefas e Usuários

Descrição:

Crie uma API para gerenciar tarefas de usuários. Os usuários poderão se cadastrar na plataforma e criar suas próprias tarefas. Cada usuário pode ter várias tarefas, mas cada tarefa pertence a apenas um usuário.
Tabelas:
Tabela de Usuários:
Campos: ID, Nome, Email, Senha, Data de criação.
Tabela de Tarefas:
Campos: ID, Título, Descrição, Data de criação, Concluída (booleana), ID do Usuário (chave estrangeira para a tabela de usuários).
Funcionalidades:
Autenticação: Permita que os usuários se cadastrem na plataforma e façam login usando suas credenciais (email/senha).
Gerenciamento de Tarefas:
Criação de tarefas: Permita que os usuários autenticados criem novas tarefas, especificando um título, descrição e status de conclusão inicial.
Listagem de tarefas: Mostre uma lista das tarefas do usuário autenticado, exibindo o título, descrição e status de conclusão.
Atualização de tarefas: Permita que os usuários autenticados atualizem o título, descrição e status de conclusão de suas tarefas existentes.
Exclusão de tarefas: Permita que os usuários autenticados excluam suas tarefas.
Filtro de tarefas: Permita que os usuários autenticados filtrem suas tarefas com base em seu status de conclusão
