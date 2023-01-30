import { Collider, GameObject, WaitForSeconds } from 'UnityEngine';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import CharacterController from './CharacterController';

export default class CubeTrigger extends ZepetoScriptBehaviour {
    characterController: GameObject;
    characterControllerScript: CharacterController;

    Start() {
        this.characterController = GameObject.FindGameObjectWithTag("CharacterController");
        this.characterControllerScript = this.characterController.GetComponent<CharacterController>();
    }

    OnTriggerEnter(collider: Collider) {
        if(collider.CompareTag("Player")) {
            const targetData = new RoomData();
            targetData.Add("roomJoinTime", Date());
            const room = this.characterControllerScript.getRoom()
            room.Send("saveTargetData", targetData.GetObject());
            room.Send("loadTargetData", this.characterControllerScript.getZepetoPlayer().userId);
        }
    }
}