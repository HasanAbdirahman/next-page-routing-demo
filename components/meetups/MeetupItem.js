import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    // all this is the same as using the Link
    router.push(`/${props.id}`);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* <Link href={`/${props.id}`}>
            <button> Show Details</button>
          </Link> */}
          <button onClick={showDetailsHandler}> Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
