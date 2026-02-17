const { 
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder 
    } = require('discord.js');

const Task = require('../../models/task');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('task')
    .setDescription('Manage tasks')
    .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('list all tasks')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Add a new task')
            .addStringOption(option =>
                option
                    .setName('name')
                    .setDescription('task name')
                    .setRequired(true)
                )
            .addStringOption(option =>
                option
                    .setName('description')
                    .setDescription('task description')
                    .setRequired(false)
                )
            .addStringOption(option =>
                option
                    .setName('duedate')
                    .setDescription('YYYY-MM-DD')
                    .setRequired(false)
                )    
    ),
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'list') {
            const tasks = await Task.find();
        await interaction.reply(tasks.map(task => `**${(task.name.toString()).padEnd(30)}** | ${task.description ? task.description.toString().padEnd(50) : (' - ').toString().padEnd(50).padStart(50)} | due: ${task.dueDate ? task.dueDate.toLocaleDateString() : ("no due date").toString().padEnd(15)}`).join('\n').slice(0,2000)); // Discord message limit
        }
        else if (subcommand === 'add') {
            const name = interaction.options.getString('name');
            const description = interaction.options.getString('description');
            const dueDate = interaction.options.getString('duedate');
            let date = null;
            let task = null;
            if (dueDate) {
                // Convert DD-MM-YYYY to ISO format
                date = new Date(`${dueDate}T23:59:00Z`).toISOString();
                task = new Task({ 
                    name: name,
                    description: description,
                    dueDate: dueDate 
                });
            }
            else {
                task = new Task({ 
                    name: name,
                    description: description
                });
            }
            
            await task.save();
            await interaction.reply(`Task "${name}" added!`);
        }
        
    }
}
    
