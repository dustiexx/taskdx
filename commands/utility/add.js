const {SlashCommandBuilder} = require('@discordjs/builders');
const Task = require('../../models/task');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add a new task')
    .addStringOption(option =>
        option
            .setName('name')
            .setDescription('task name')
            .setMaxLength(30)
            .setRequired(true)
        )
    .addStringOption(option =>
        option
            .setName('description')
            .setDescription('task description')
            .setMaxLength(100)
            .setRequired(false)
        )
    .addStringOption(option =>
        option
            .setName('duedate')
            .setDescription('YYYY-MM-DD')
            .setRequired(false)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const dueDate = interaction.options.getString('duedate');
        const assignee = interaction.user.username;
        let task = null;
        if (dueDate) {
            // Convert DD-MM-YYYY to ISO format
            date = new Date(`${dueDate}T23:59:00Z`).toISOString();
            task = new Task({ 
                name: name,
                description: description,
                dueDate: dueDate ,
                assignee: assignee
            });
        }
        else{
            task = new Task({ 
                name: name,
                description: description,
                assignee: assignee
            });
        }
        // await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await task.save();
        await interaction.reply(`Task **${name}** assigned to ${assignee}.\n You can vie tasks with /list`);
    }
};