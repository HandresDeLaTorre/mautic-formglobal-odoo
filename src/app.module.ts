import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormsController } from './controllers/mautic/forms/forms.controller';
import { ApimauticService } from './services/mautic/apimautic/apimautic.service';
import { TurnosService } from './services/utils/turnos/turnos.service';
import { ApiodooService } from './services/odoo/apiodoo/apiodoo.service';
import { ValidateuserService } from './services/utils/validateuser/validateuser.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, FormsController],
  providers: [AppService, ApimauticService, TurnosService, ApiodooService, ValidateuserService],
})
export class AppModule {}
