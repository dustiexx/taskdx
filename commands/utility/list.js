const { SlashCommandBuilder } = require('discord.js');
const Task = require('../../models/task');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all tasks'),
    async execute(interaction) {
        const tasks = await Task.find({assignee:interaction.user.username.toString()}); //150 char / task, 13 task per page (2000 char limit )
        if(tasks.length === 0){
            await interaction.reply("You have no tasks assigned. Create one with /add");
            return;
        }
        let reply=''
        for (i=0;i<tasks.length;i++){
            reply+= //update reply message
            `**${(tasks[i].name.toString())}**\n` +
            ` - id: ${tasks[i]._id}\n`+
            ` - description: ${tasks[i].description ? tasks[i].description.toString(): (' - ')}\n` +
            ` - due: ${tasks[i].dueDate ? tasks[i].dueDate.toLocaleDateString() : ("no due date")}\n`   
        }
        await interaction.reply(reply)
    }
};